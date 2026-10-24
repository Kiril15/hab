import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/consts";

export const dynamic = "force-static";

export function GET() {
  const content = `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

- [Home](${SITE_URL})
`;

  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
