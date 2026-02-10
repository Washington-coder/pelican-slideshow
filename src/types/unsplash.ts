import { z } from 'zod';

// Zod schema for Unsplash API response validation
export const UnsplashUserSchema = z.object({
  id: z.string(),
  username: z.string(),
  name: z.string(),
});

export const UnsplashUrlsSchema = z.object({
  raw: z.string().url(),
  full: z.string().url(),
  regular: z.string().url(),
  small: z.string().url(),
  thumb: z.string().url(),
});

export const UnsplashPhotoSchema = z.object({
  id: z.string(),
  alt_description: z.string().nullable(),
  description: z.string().nullable(),
  urls: UnsplashUrlsSchema,
  user: UnsplashUserSchema,
  width: z.number(),
  height: z.number(),
});

// TypeScript types derived from Zod schemas
export type UnsplashPhoto = z.infer<typeof UnsplashPhotoSchema>;
export type UnsplashUrls = z.infer<typeof UnsplashUrlsSchema>;
export type UnsplashUser = z.infer<typeof UnsplashUserSchema>;
