import type { z } from "zod";
import type { generateProjectSchema } from "../schema";

export type GenerateProjectFormValues = z.infer<typeof generateProjectSchema>;
