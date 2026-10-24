import type { FontSelection, FontStyle } from "@repo/types";
import { IsIn, IsString } from "class-validator";
import { IsAvailableFont } from "../../../fonts/validators";

export class FontDto implements FontSelection {
	@IsString()
	@IsAvailableFont()
	family: string;

	@IsIn(["normal", "italic"])
	style: FontStyle;

	@IsString()
	subset: string;
}
