import { Type } from 'class-transformer';
import { IsIn, IsOptional, IsString, ValidateNested } from 'class-validator';
import type { Fonts, FontSelection, FontStyle } from '@repo/types';
import { IsAvailableFont } from '../../fonts/validators';

export class FontDto implements FontSelection {
    @IsString()
    @IsAvailableFont()
    family: string;

    @IsIn(['normal', 'italic'])
    style: FontStyle;

    @IsString()
    subset: string;
}

export class FontsDto implements Fonts {
    @ValidateNested()
    @Type(() => FontDto)
    primary: FontDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => FontDto)
    secondary?: FontDto;
}
