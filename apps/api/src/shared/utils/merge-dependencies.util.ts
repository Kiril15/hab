import { BadRequestException } from '@nestjs/common';

const FORBIDDEN_DEPENDENCY_NAMES = new Set(['__proto__', 'constructor', 'prototype']);

export interface PackageVariable {
    name: string;
    version: string;
}

export interface MergeDependenciesResult {
    overwritten: string[];
}

export function mergeDependencies(
    json: Record<string, Record<string, string>>,
    field: 'dependencies' | 'devDependencies',
    packages: PackageVariable[],
): MergeDependenciesResult {
    const overwritten: string[] = [];

    for (const { name, version } of packages) {
        if (FORBIDDEN_DEPENDENCY_NAMES.has(name)) {
            throw new BadRequestException(`Invalid package name: ${name}`);
        }

        json[field] ??= {};
        if (json[field][name]) {
            overwritten.push(name);
        }
        json[field][name] = version;
    }

    return { overwritten };
}
