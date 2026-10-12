import { IsArray, IsString, Matches, ValidateNested } from 'class-validator';
import { PackageDto } from './package.dto';
import { ThemeDto } from './theme.dto';
import { FontsDto } from './fonts.dto';
import { Type } from 'class-transformer';
import type { GenerateProjectRequest } from '@repo/types';

export class GenerateProjectDto implements GenerateProjectRequest {
    @ValidateNested()
    @Type(() => PackageDto)
    packageJson: PackageDto;

    @IsArray()
    @IsString({ each: true })
    @Matches(/^[a-zA-Z0-9-]+$/, {
        each: true,
        message: 'Page names must be in English only',
    })
    pages: string[];

    @ValidateNested()
    @Type(() => ThemeDto)
    theme: ThemeDto;

    @ValidateNested()
    @Type(() => FontsDto)
    fonts: FontsDto;
}
