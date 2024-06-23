"use client";

import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().min(3, {
    message: "Project name must be at least 3 characters long",
  }),
  description: z.string().nullable(),
});
