import type { PackageDependency } from "@repo/types";
import { useMutation } from "@tanstack/react-query";
import { getLatestVersionsAction } from "../api";
import type { PackagePreset } from "../config";

export interface PresetVersions {
	dependencies: PackageDependency[];
	devDependencies: PackageDependency[];
}

export function useAddPreset(onAdd: (versions: PresetVersions) => void) {
	return useMutation({
		mutationFn: async ({ packages, devPackages = [] }: PackagePreset): Promise<PresetVersions> => {
			const [dependencies, devDependencies] = await Promise.all([
				getLatestVersionsAction(packages),
				getLatestVersionsAction(devPackages),
			]);
			return { dependencies, devDependencies };
		},
		onSuccess: onAdd,
	});
}
