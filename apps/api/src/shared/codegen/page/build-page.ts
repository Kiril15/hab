import type { BuildPageProps } from "../../types";

export function buildPage({ componentName, view, parts }: BuildPageProps): string {
	const imports = [...parts.imports, `import ${componentName} from "@/views/${view}";`];

	return `${imports.join("\n")}

export { metadata } from "@/views/${view}";

export default ${parts.signature} {
${parts.setup}  return <${componentName} />;
}
`;
}
