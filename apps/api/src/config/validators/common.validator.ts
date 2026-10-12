import { IsString, IsInt, Min, Max } from "class-validator"

export class CommonValidator {
    @IsString()
    CLIENT_URL: string

    @IsInt()
    @Min(1)
    @Max(65535)
    PORT: number
}