import { join } from 'node:path';

export const ROOT_DIR = join(process.cwd(), '../..');
export const TEMPLATE_BASE_DIR = join(ROOT_DIR, 'templates/base');
export const TEMPLATE_OPTIONS_DIR = join(ROOT_DIR, 'templates/options')