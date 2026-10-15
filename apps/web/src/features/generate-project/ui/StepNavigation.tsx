"use client";

import { ArrowLeft, ArrowRight, Download } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/shared/ui/button";

interface StepNavigationProps {
	isFirst: boolean;
	isLast: boolean;
	isSubmitting: boolean;
	onBack: () => void;
	onNext: () => void;
}

export function StepNavigation({
	isFirst,
	isLast,
	isSubmitting,
	onBack,
	onNext,
}: StepNavigationProps) {
	const t = useTranslations("GenerateProject");

	return (
		<div className="flex items-center justify-between border-t border-border pt-6">
			<Button
				variant="ghost"
				onClick={onBack}
				disabled={isFirst || isSubmitting}
			>
				<ArrowLeft className="size-4" />
				{t("back")}
			</Button>

			{isLast ? (
				<Button
					key="submit"
					type="submit"
					size="lg"
					isLoading={isSubmitting}
				>
					{!isSubmitting && <Download className="size-4" />}
					{t("submit")}
				</Button>
			) : (
				<Button
					key="next"
					size="lg"
					onClick={onNext}
				>
					{t("next")}
					<ArrowRight className="size-4" />
				</Button>
			)}
		</div>
	);
}
