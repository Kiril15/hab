import type { GenerateProjectRequest } from "@repo/types";
import { Type } from "class-transformer";
import {
	ArrayMaxSize,
	IsArray,
	IsDefined,
	IsString,
	Matches,
	ValidateNested,
} from "class-validator";
import { ProjectOptionsDto } from "../options/dto";
import { FontsDto, PackageDependencyDto, ProjectDto, ThemeDto } from "../project/dto";

const PAGE_SLUG = /^[a-zA-Z0-9-]+$/;
const MAX_PAGES = 20;
const MAX_DEPENDENCIES = 50;

export class GenerateProjectDto implements GenerateProjectRequest {
	@IsDefined()
	@ValidateNested()
	@Type(() => ProjectDto)
	project: ProjectDto;

	@IsArray()
	@ArrayMaxSize(MAX_DEPENDENCIES)
	@ValidateNested({ each: true })
	@Type(() => PackageDependencyDto)
	dependencies: PackageDependencyDto[];

	@IsArray()
	@ArrayMaxSize(MAX_DEPENDENCIES)
	@ValidateNested({ each: true })
	@Type(() => PackageDependencyDto)
	devDependencies: PackageDependencyDto[];

	@IsArray()
	@ArrayMaxSize(MAX_PAGES)
	@IsString({ each: true })
	@Matches(PAGE_SLUG, { each: true, message: "Page names must be in English only" })
	pages: string[];

	@IsDefined()
	@ValidateNested()
	@Type(() => ThemeDto)
	theme: ThemeDto;

	@IsDefined()
	@ValidateNested()
	@Type(() => FontsDto)
	fonts: FontsDto;

	@IsDefined()
	@ValidateNested()
	@Type(() => ProjectOptionsDto)
	projectOptions: ProjectOptionsDto;
}
