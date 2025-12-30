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
    new_password: z
      .string()
      .min(1, { message: 'Password is required' })
      .min(8, { message: 'This password is too short. It must contain at least 8 characters.' })
      .refine((password) => !commonPasswords.includes(password.toLowerCase()), {
        message: 'This password is too common.',
      })
      .refine((password) => !/^\d+$/.test(password), {
        message: 'This password is entirely numeric.',
      }),

    confirm_password: z
      .string()
      .min(1, { message: 'Confirm password is required' }),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match",
    path: ['confirm_password'],
  });


const commonPasswords = [
  "password",
  "12345678",
  "123456789",
  "qwerty123",
  "password123",
  "admin123",
  "letmein",
  "welcome",
  "abc123",
  "iloveyou",
  "11111111",
  "00000000",
  "12341234",
  "1234567890",
];

export const changePasswordValidationSchema = z
  .object({
    current_password: z
      .string()
      .min(1, { message: "Old password is required" }),

    new_password: z
      .string()
      .min(1, { message: "New password is required" })
      .min(8, { message: "This password is too short. It must contain at least 8 characters." })
      .refine((pwd) => !commonPasswords.includes(pwd.toLowerCase()), {
        message: "This password is too common.",
      })
      .refine((pwd) => !/^\d+$/.test(pwd), {
        message: "This password is entirely numeric.",
      }),

    confirm_password: z
      .string()
      .min(1, { message: "Confirm new password is required" }),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "New passwords do not match",
    path: ["confirm_password"],
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
