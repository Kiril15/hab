import { registerAs } from "@nestjs/config";
import { type CommonConfig } from "../types";
import { validateEnv } from "../../shared/utils";
import { CommonValidator } from "../validators";

export const commonEnv = registerAs<CommonConfig>('common', () => {
    validateEnv(process.env, CommonValidator)

    return {
        clientUrl: process.env.CLIENT_URL,
        port: Number(process.env.PORT)
    }
})