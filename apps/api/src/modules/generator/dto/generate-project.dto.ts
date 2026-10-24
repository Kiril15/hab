import { IsArray, IsDefined, IsOptional, IsString, Matches, ValidateNested } from 'class-validator';
import { ThemeDto, FontsDto, PackageDto } from './build';
import { Type } from 'class-transformer';
import type { GenerateProjectRequest } from '@repo/types';
import { ProjectOptionsDto } from './options';

const SITE_URL = /^https?:\/\/([a-z0-9-]+\.)+[a-z]{2,}$/i;

export class GenerateProjectDto implements GenerateProjectRequest {
    @IsDefined()
    @ValidateNested()
    @Type(() => PackageDto)
    packageJson: PackageDto;

    @IsOptional()
    @Matches(SITE_URL, { message: 'siteUrl must be a domain URL like https://example.com' })
    siteUrl?: string;

    @IsArray()
    @IsString({ each: true })
    @Matches(/^[a-zA-Z0-9-]+$/, {
        each: true,
        message: 'Page names must be in English only',
    })
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
