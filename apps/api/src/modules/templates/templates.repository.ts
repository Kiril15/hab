import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';

@Injectable()
export class TemplatesRepository {
    async readFile(path: string): Promise<string> {
        return fs.readFile(path, 'utf-8');
    }

    async readDirectory(path: string): Promise<string[]> {
        return fs.readdir(path);
    }
}