import zod from 'zod';
const envSchema = zod.object({
  DATABASE_URL: zod.string().min(1),
  GOOGLE_CLIENT_ID: zod.string().min(1),
  GOOGLE_CLIENT_SECRET: zod.string().min(1),
  NEXTAUTH_URL: zod.string().min(1),
  NEXTAUTH_SECRET: zod.string().min(1),
  MY_EMAIL: zod.string().min(1),
  MY_PASSWORD: zod.string().min(1),
  STRIPE_PUBLIC: zod.string().min(1),
  STRIPE_PUBLISH: zod.string().min(1),
  STRIPE_SECRET: zod.string().min(1),
});

export const env = envSchema.parse(process.env);
