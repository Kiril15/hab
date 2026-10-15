"use client";

import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import type { GenerateProjectFormValues, PresetVersions } from "../../model";
import { DependencyList, PackagePresets } from "../fields";

export function DependenciesStep() {
	const { control } = useFormContext<GenerateProjectFormValues>();
	const dependencies = useFieldArray({ control, name: "dependencies" });
	const devDependencies = useFieldArray({ control, name: "devDependencies" });

	const [currentDependencies, currentDevDependencies] = useWatch({
		control,
		name: ["dependencies", "devDependencies"],
	});
	const installed = new Set(
		[...currentDependencies, ...currentDevDependencies].map(({ name }) => name),
	);

	const addPreset = (versions: PresetVersions) => {
		const toRows = (list: PresetVersions["dependencies"]) =>
			list
				.filter(({ name }) => !installed.has(name))
				.map(({ name, version }) => ({ name, version: `^${version}` }));

		dependencies.append(toRows(versions.dependencies));
		devDependencies.append(toRows(versions.devDependencies));
	};

	return (
		<div className="grid gap-8">
			<PackagePresets
				installed={installed}
				onAdd={addPreset}
			/>
			<DependencyList
				name="dependencies"
				fieldArray={dependencies}
			/>
			<DependencyList
				name="devDependencies"
				fieldArray={devDependencies}
			/>
		</div>
	);
}
