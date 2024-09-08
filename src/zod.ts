import { z } from "zod";
import ErrorPage from "@/pages/error";

export const Period = z.enum(["month", "week", "day", "hour"]);
const BaseSchema = z.object({
  content: z
    .string()
    .max(5000, "Content must not exceed 5,000 characters.")
    .min(1, "Content is required."),
  highlight: z.string().max(20, "Highlight must not exceed 20 characters."),
});
export const submitSchema = BaseSchema.extend({ expiry: Period });
export const editSchema = BaseSchema;

export const handleZodError = (err: z.ZodError) => {
  const errorMessages = err.errors
    .map((e) => `${e.path.join(".")}: ${e.message}`)
    .join(", ");
  return ErrorPage({
    statsMessage: "400 - Bad Request",
    errorMessage: errorMessages,
  });
};
