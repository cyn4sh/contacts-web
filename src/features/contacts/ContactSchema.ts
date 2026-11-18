import { z } from "zod"

export const ContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().optional(),
  email: z.email("Enter a valid email").or (z.literal("")),
})

