import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TemplatesRepository {
	async readFile(path: string): Promise<string> {
		return readFile(path, "utf-8");
	}

	async readFileBuffer(path: string): Promise<Buffer> {
		return readFile(path);
	}

	async listFiles(root: string, ignoredNames: ReadonlySet<string>, base = ""): Promise<string[]> {
		const entries = await readdir(join(root, base), { withFileTypes: true });
		const files: string[] = [];

		for (const entry of entries) {
			if (ignoredNames.has(entry.name)) continue;

			const path = base ? `${base}/${entry.name}` : entry.name;

			if (entry.isDirectory()) {
				files.push(...(await this.listFiles(root, ignoredNames, path)));
			} else if (entry.isFile()) {
				files.push(path);
			}
		}

		return files;
	}
}
