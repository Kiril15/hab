export function buildPageStub(componentName: string, page: string): string {
    return `import ${componentName} from '@/views/${page}'

export { metadata } from '@/views/${page}'

export default function Page() {
    return <${componentName} />
}
`
}
