export function buildView(componentName: string): string {
	return `export default function ${componentName}() {
  return <div></div>;
}
`;
}
