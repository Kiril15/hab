"use server";

import type { PackageDependency, PackageSearchResult } from "@repo/types";
import { MIN_PACKAGE_QUERY_LENGTH } from "../../config/package-search.config";
import type { NpmLatestResponse, NpmSearchResponse } from "./npm-registry.types";

const NPM_REGISTRY_URL = "https://registry.npmjs.org";
const VERSION_CACHE_SECONDS = 3600;

export async function searchPackagesAction(query: string): Promise<PackageSearchResult[]> {
	const text = query.trim();
	if (text.length < MIN_PACKAGE_QUERY_LENGTH) return [];

	const url = new URL(`${NPM_REGISTRY_URL}/-/v1/search`);
	url.searchParams.set("text", text);
	url.searchParams.set("size", String(10));

	const response = await fetch(url, { next: { revalidate: 300 } });
	if (!response.ok) {
		throw new Error(`npm search failed with status ${response.status}`);
	}

	const { objects } = (await response.json()) as NpmSearchResponse;

	return objects.map(({ package: pkg }) => ({
		name: pkg.name,
		version: pkg.version,
		description: pkg.description ?? "",
	}));
}

export async function getLatestVersionsAction(names: string[]): Promise<PackageDependency[]> {
	const uniqueNames = [...new Set(names.map((name) => name.trim()).filter(Boolean))];

	return Promise.all(
		uniqueNames.map(async (name: string) => {
			const response = await fetch(`${NPM_REGISTRY_URL}/${encodeURIComponent(name)}/latest`, {
				next: { revalidate: VERSION_CACHE_SECONDS },
			});
			if (!response.ok) {
				throw new Error(`npm package "${name}" failed with status ${response.status}`);
			}

			const { version } = (await response.json()) as NpmLatestResponse;

			return { name, version };
		}),
	);
}
