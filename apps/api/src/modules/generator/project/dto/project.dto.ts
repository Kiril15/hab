import type { ProjectInfo } from "@repo/types";
import { IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

const LATIN_TEXT = /^[a-zA-Z\s.,!?-]+$/;
const SITE_URL = /^https?:\/\/([a-z0-9-]+\.)+[a-z]{2,}$/i;

export class ProjectDto implements ProjectInfo {
	@IsString()
	@Matches(LATIN_TEXT, { message: "Project name must be in English only" })
	@MinLength(3, { message: "Project name must be at least 3 characters long" })
	@MaxLength(50, { message: "Project name must not exceed 50 characters" })
	projectName: string;

	@IsString()
	@Matches(LATIN_TEXT, { message: "Project description must be in English only" })
	@MinLength(3, { message: "Project description must be at least 3 characters long" })
	@MaxLength(200, { message: "Project description must not exceed 200 characters" })
	projectDesc: string;

	@IsString()
	@Matches(LATIN_TEXT, { message: "Author name must be in English only" })
	@MinLength(3, { message: "Author name must be at least 3 characters long" })
	@MaxLength(50, { message: "Author name must not exceed 50 characters" })
	author: string;

	@IsOptional()
	@Matches(SITE_URL, { message: "siteUrl must be a domain URL like https://example.com" })
	siteUrl?: string;
}
