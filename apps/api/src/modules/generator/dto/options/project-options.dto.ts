import type { ProjectOptions } from "@repo/types";
import { Type } from "class-transformer";
import { IsOptional, ValidateNested } from "class-validator";
import { I18nOptionsDto } from "./i18n-options.dto";

export class ProjectOptionsDto implements ProjectOptions {
	@IsOptional()
	@ValidateNested()
	@Type(() => I18nOptionsDto)
	i18n?: I18nOptionsDto;
}
