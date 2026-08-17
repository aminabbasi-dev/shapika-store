// features/auth/validations/authSchema.ts

import { z } from 'zod';

// اعتبارسنجی ورود
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'ایمیل یا شماره موبایل الزامی است')
    .email('فرمت ایمیل صحیح نیست'),
  password: z
    .string()
    .min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد'),
  remember: z.boolean().optional(),
});

// اعتبارسنجی ثبت‌نام (Register)
export const registerSchema = z
  .object({
    first_name: z
      .string()
      .min(2, 'نام باید حداقل ۲ کاراکتر باشد')
      .max(50, 'نام نباید بیشتر از ۵۰ کاراکتر باشد')
      .regex(/^[\u0600-\u06FF\s]+$/, 'نام باید به فارسی وارد شود'), // اختیاری: فقط فارسی
    last_name: z
      .string()
      .min(2, 'نام خانوادگی باید حداقل ۲ کاراکتر باشد')
      .max(50, 'نام خانوادگی نباید بیشتر از ۵۰ کاراکتر باشد')
      .regex(/^[\u0600-\u06FF\s]+$/, 'نام خانوادگی باید به فارسی وارد شود'), // اختیاری: فقط فارسی
    email: z
      .string()
      .min(1, 'ایمیل الزامی است')
      .email('فرمت ایمیل صحیح نیست'),
    phone_number: z
      .string()
      // .regex(/^09[0-9]{9}$/, 'شماره موبایل باید با ۰۹ شروع و ۱۱ رقم باشد')
      .optional()
      .or(z.literal('')),
    password: z
      .string()
      .min(8, 'رمز عبور باید حداقل ۸ کاراکتر باشد')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'رمز عبور باید شامل حروف بزرگ، کوچک و عدد باشد'
      ),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine(val => val === true, {
      message: 'برای ثبت‌نام باید قوانین را بپذیرید',
    }),
    acceptNewsletter: z.boolean().optional(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'رمز عبور و تکرار آن مطابقت ندارند',
    path: ['confirmPassword'],
  });

export type LoginSchemaType = z.infer<typeof loginSchema>;
export type RegisterSchemaType = z.infer<typeof registerSchema>;