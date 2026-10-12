export function buildViewStub(componentName: string): string {
    return `export default function ${componentName}() {
    return <div></div>
}
`
}
