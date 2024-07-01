import { z } from "zod";

export const UpdateProjectSchema = z.object({
  id: z.string(),
  name: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
});
