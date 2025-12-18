import { z } from "zod";

export const signInValidationSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Enter email address" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(1, { message: "Password is required" }),
  rememberMe: z.boolean().optional(),
});

export const forgotPasswordValidationSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Enter email address" })
    .email({ message: "Invalid email address" }),
})

export const resetPasswordValidationSchema = z
  .object({
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().min(1, { message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });


export const changePasswordValidationSchema = z
  .object({
    oldPassword: z
      .string()
      .min(1, { message: "Old password is required" }),

    newPassword: z
      .string()
      .min(1, { message: "New password is required" })
      .min(6, { message: "New password must be at least 6 characters" }),

    confirmNewPassword: z
      .string()
      .min(1, { message: "Confirm new password is required" }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "New passwords do not match",
    path: ["confirmNewPassword"],
  });


export const privacyPolicyValidationSchema = z.object({
  privacyAndPolicy: z
    .string()
    .min(1, { message: "Privacy policy is required" })
    .min(200, { message: "Privacy policy must be at least 200 characters long" }),
});

export const termsServiceValidationSchema = z.object({
  termsAndService: z
    .string()
    .min(1, { message: "Terms and service is required" })
    .min(200, { message: "Terms and service must be at least 200 characters long" }),
});


export const aboutValidationSchema = z.object({
  about: z
    .string()
    .min(1, { message: "About is required" })
    .min(200, { message: "About must be at least 200 characters long" }),
});
