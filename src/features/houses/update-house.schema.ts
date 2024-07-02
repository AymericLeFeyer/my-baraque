import { z } from "zod";

export const UpdateHouseSchema = z.object({
  id: z.string(),
  name: z.string().optional().nullable(),
  ownerId: z.string().optional().nullable(),
});
