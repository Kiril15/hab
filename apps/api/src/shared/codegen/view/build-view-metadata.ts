import { capitalizeSlug } from "../../utils";

export function buildViewMetadata(name: string): string {
	return `import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "${capitalizeSlug(name, " ")}",
  description: "",
};
`;
}
