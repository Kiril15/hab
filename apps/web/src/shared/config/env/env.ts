import { validateEnv } from "@/shared/lib/validate-env";
import { envSchema } from "./env.schema";
import type { Env } from "./env.types";

export const env: Env = validateEnv(envSchema, {
	serverUrl: process.env.NEXT_PUBLIC_API_URL,
});
