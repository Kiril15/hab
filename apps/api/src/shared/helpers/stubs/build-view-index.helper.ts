export function buildViewIndex(componentName: string, page: string): string {
    return `export { default } from './${componentName}'
export { metadata } from './${page}.metadata'
`
}
