// const fontPrimary = Inter({
//   variable: "--font-primary",
//   style: ["italic"],
//   subsets: ["latin"],
// });
export function buildFontDeclaration(constName: string, importName: string, options: object): string {
    const fields = Object.entries(options)
        .map(([key, value]) => `  ${key}: ${JSON.stringify(value).replaceAll(',', ', ')},`)
        .join('\n')

    return `const ${constName} = ${importName}({\n${fields}\n});`
}
