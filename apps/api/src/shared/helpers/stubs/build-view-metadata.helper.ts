export function buildViewMetadata(page: string): string {
    const title = page
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ')

    return `import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: '${title}',
    description: '',
}
`
}
