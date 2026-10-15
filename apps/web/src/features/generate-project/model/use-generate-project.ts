import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { generateProject } from "@/shared/api/generator";
import { downloadBlob } from "@/shared/lib/download";

export function useGenerateProject() {
	const t = useTranslations("GenerateProject");

	return useMutation({
		mutationFn: generateProject,
		onSuccess: ({ blob, filename }) => {
			downloadBlob(blob, filename);
			toast.success(t("success"));
		},
	});
}
