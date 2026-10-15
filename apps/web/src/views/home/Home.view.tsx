import { Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { GenerateProjectForm } from "@/features/generate-project";

export function Home() {
	const t = useTranslations("Home");

	return (
		<main className="relative min-h-screen overflow-hidden px-4 py-16 sm:py-24">
			<div
				aria-hidden
				className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px] bg-[radial-gradient(ellipse_at_top,var(--accent),transparent_70%)]"
			/>

			<div className="mx-auto flex max-w-3xl flex-col gap-10">
				<header className="flex flex-col items-center gap-4 text-center">
					<span className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
						<Sparkles className="size-3.5 text-primary" />
						{t("badge")}
					</span>
					<h1 className="font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
						{t("title")}
					</h1>
					<p className="max-w-xl text-balance text-muted-foreground">{t("subtitle")}</p>
				</header>

				<GenerateProjectForm />
			</div>
		</main>
	);
}
