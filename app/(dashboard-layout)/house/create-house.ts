"use client"

import { z } from "zod";

export const createHouseSchema = z.object({
    name: z.string().min(3, {
        message: "House name must be at least 3 characters long",
    })
});

