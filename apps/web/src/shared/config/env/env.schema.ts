import * as z from "zod";

export const envSchema = z.object({
	serverUrl: z.url(),
});
