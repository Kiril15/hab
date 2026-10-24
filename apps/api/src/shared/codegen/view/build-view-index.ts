export function buildViewIndex(componentName: string, name: string): string {
	return `export { default } from "./${componentName}";
export { metadata } from "./${name}.metadata";
`;
}
