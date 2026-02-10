import type { UnsplashPhoto } from '../types/unsplash';
import { UnsplashPhotoSchema } from '../types/unsplash';

const UNSPLASH_API_URL = 'https://api.unsplash.com';
const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export class UnsplashApiError extends Error {
  statusCode?: number;
  
  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = 'UnsplashApiError';
    this.statusCode = statusCode;
  }
}

/**
 * Fetches a random pelican image from Unsplash API
 * @returns Promise<UnsplashPhoto> - Validated photo data
 * @throws UnsplashApiError if the API call fails or response is invalid
 */
export async function fetchRandomPelicanImage(): Promise<UnsplashPhoto> {
  if (!ACCESS_KEY) {
    throw new UnsplashApiError(
      'Missing Unsplash API key. Please set VITE_UNSPLASH_ACCESS_KEY in your .env file.'
    );
  }

  const url = `${UNSPLASH_API_URL}/photos/random?query=pelican`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
      },
    });

    if (!response.ok) {
      throw new UnsplashApiError(
        `Failed to fetch image: ${response.statusText}`,
        response.status
      );
    }

    const data = await response.json();
    
    // Validate response with Zod schema
    const validationResult = UnsplashPhotoSchema.safeParse(data);
    
    if (!validationResult.success) {
      console.error('Validation errors:', validationResult.error.issues);
      throw new UnsplashApiError(
        'Invalid API response format: ' + validationResult.error.message
      );
    }

    return validationResult.data;
  } catch (error) {
    if (error instanceof UnsplashApiError) {
      throw error;
    }
    throw new UnsplashApiError(
      error instanceof Error ? error.message : 'Unknown error occurred'
    );
  }
}
