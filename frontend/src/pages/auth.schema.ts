import * as z from "zod";

export const registerSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type loginFormData = z.infer<typeof loginSchema>;

export const productSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  price: z.coerce.number<number>().min(1, "Price must be at least 1"),
  category: z.string().min(1, "Please select a category"),
  description: z
    .string()
    .min(10, "Description should be at least 10 characters"),
  image: z.string().url("Invalid image URL"),
});

export type ProductFormData = z.infer<typeof productSchema>;
