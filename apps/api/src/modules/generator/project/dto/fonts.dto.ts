import type { Fonts } from "@repo/types";
import { Type } from "class-transformer";
import { IsOptional, ValidateNested } from "class-validator";
import { FontDto } from "./font.dto";

export class FontsDto implements Fonts {
	@ValidateNested()
	@Type(() => FontDto)
	primary: FontDto;

	@IsOptional()
	@ValidateNested()
	@Type(() => FontDto)
	secondary?: FontDto;
}
