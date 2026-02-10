import { describe, it, expect } from 'vitest';
import { UnsplashPhotoSchema } from '../types/unsplash';
import { mockPhoto } from './mocks';

describe('Zod Schema Validation', () => {
  it('validates a correct photo object', () => {
    const result = UnsplashPhotoSchema.safeParse(mockPhoto);
    expect(result.success).toBe(true);
  });

  it('rejects photo with missing required fields', () => {
    const invalidPhoto = {
      id: 'test-id',
      // missing other required fields
    };
    const result = UnsplashPhotoSchema.safeParse(invalidPhoto);
    expect(result.success).toBe(false);
  });

  it('rejects photo with invalid url format', () => {
    const invalidPhoto = {
      ...mockPhoto,
      urls: {
        ...mockPhoto.urls,
        regular: 'not-a-valid-url',
      },
    };
    const result = UnsplashPhotoSchema.safeParse(invalidPhoto);
    expect(result.success).toBe(false);
  });

  it('accepts null values for nullable fields', () => {
    const photoWithNulls = {
      ...mockPhoto,
      alt_description: null,
      description: null,
    };
    const result = UnsplashPhotoSchema.safeParse(photoWithNulls);
    expect(result.success).toBe(true);
  });

  it('rejects invalid user object', () => {
    const invalidPhoto = {
      ...mockPhoto,
      user: {
        id: 123, // should be string
        username: 'test',
        name: 'Test',
      },
    };
    const result = UnsplashPhotoSchema.safeParse(invalidPhoto);
    expect(result.success).toBe(false);
  });
});
