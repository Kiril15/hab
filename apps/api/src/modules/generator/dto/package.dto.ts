import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString, Matches, MaxLength, MinLength, ValidateNested } from "class-validator";
import type { PackageDependency, PackageInfo } from "@repo/types";

export class PackageDto implements PackageInfo {
    @IsString()
    @Matches(/^[a-zA-Z\s.,!?-]+$/, {
      message: 'Text must be in English only',
    })
    @MinLength(3, { message: 'Project name must be at least 3 characters long' })
    @MaxLength(50, { message: 'Project name must not exceed 50 characters' })
    projectName: string;

    @IsString()
    @Matches(/^[a-zA-Z\s.,!?-]+$/, {
      message: 'Text must be in English only',
    })
    @MinLength(3, { message: 'Project description must be at least 3 characters long' })
    @MaxLength(200, { message: 'Project description must not exceed 200 characters' })
    projectDesc: string;

    @IsString()
    @Matches(/^[a-zA-Z\s.,!?-]+$/, {
      message: 'Text must be in English only',
    })
    @MinLength(3, { message: 'Author name must be at least 3 characters long' })
    @MaxLength(50, { message: 'Author name must not exceed 50 characters' })
    author: string;

    @IsOptional() 
    @IsArray() 
    @ValidateNested({ each: true }) 
    @Type(() => PackageVariableDto)
    dependencies?: PackageVariableDto[];

    @IsOptional() 
    @IsArray() 
    @ValidateNested({ each: true }) 
    @Type(() => PackageVariableDto)
    devDependencies?: PackageVariableDto[];
}

export class PackageVariableDto implements PackageDependency {
    @IsString()
    @Matches(/^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/, { 
      message: 'Invalid npm package name' 
    })
    name: string;

    @IsString()
    @Matches(/^[\^~]?\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$/, { 
      message: 'Invalid semver version' 
    })
    version: string;
}