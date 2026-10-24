export function buildLocalePageStub(componentName: string, page: string): string {
    return `import { setRequestLocale } from 'next-intl/server'
import ${componentName} from '@/views/${page}'

export { metadata } from '@/views/${page}'

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    setRequestLocale(locale)

    return <${componentName} />
}
`
}
