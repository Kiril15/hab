import type { BuildLayoutProps } from "../../types";

export function buildLayout({ fontCode, parts, providers }: BuildLayoutProps): string {
	const imports = [
		'import type { Metadata } from "next";',
		...parts.imports,
		fontCode.imports,
		...providers.map(({ name, from }) => `import { ${name} } from "${from}";`),
		'import { SITE_DESCRIPTION, SITE_NAME } from "@/consts";',
		`import "${parts.css}";`,
	];
	const content = providers.reduceRight(
		(inner, { name }) => `<${name}>${inner}</${name}>`,
		"{children}",
	);

	return `${imports.join("\n")}

${fontCode.declarations}

export const metadata: Metadata = {
  title: { default: SITE_NAME, template: \`%s | \${SITE_NAME}\` },
  description: SITE_DESCRIPTION,
};
${parts.staticParams}
export default ${parts.signature} {
${parts.setup}  return (
    <html
      lang=${parts.lang}
      className={\`${fontCode.classNames} h-full antialiased\`}
    >
      <body className="min-h-full flex flex-col">${content}</body>
    </html>
  );
}
`;
}
