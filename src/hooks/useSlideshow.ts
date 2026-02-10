import { useState, useCallback, useRef, useEffect } from 'react';
import type { UnsplashPhoto } from '../types/unsplash';
import { fetchRandomPelicanImage, UnsplashApiError } from '../api/unsplash';

const MAX_CACHED_IMAGES = 5;
const SLIDESHOW_INTERVAL = 2000; // 2 seconds

export interface SlideshowState {
  images: UnsplashPhoto[];
  currentIndex: number;
  isPlaying: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface SlideshowActions {
  play: () => void;
  pause: () => void;
  next: () => void;
  previous: () => void;
  fetchInitialImage: () => Promise<void>;
}

/**
 * Custom hook for managing the pelican slideshow state and actions
 */
export function useSlideshow(): [SlideshowState, SlideshowActions] {
  const [images, setImages] = useState<UnsplashPhoto[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const intervalRef = useRef<number | null>(null);

  // Fetch a new image and add to the collection
  const fetchNewImage = useCallback(async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const newImage = await fetchRandomPelicanImage();
      
      setImages((prevImages) => {
        const newImages = [...prevImages, newImage];
        // Keep only the last MAX_CACHED_IMAGES
        if (newImages.length > MAX_CACHED_IMAGES) {
          return newImages.slice(-MAX_CACHED_IMAGES);
        }
        return newImages;
      });

      // Update current index to point to the new image
      setCurrentIndex((prevIndex) => {
        return Math.min(prevIndex + 1, MAX_CACHED_IMAGES - 1);
      });

      return true;
    } catch (err) {
      const message = err instanceof UnsplashApiError
        ? err.message
        : 'Failed to fetch image';
      setError(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch initial image on mount
  const fetchInitialImage = useCallback(async () => {
    if (images.length === 0) {
      setIsLoading(true);
      setError(null);
      try {
        const newImage = await fetchRandomPelicanImage();
        setImages([newImage]);
        setCurrentIndex(0);
      } catch (err) {
        const message = err instanceof UnsplashApiError
          ? err.message
          : 'Failed to fetch initial image';
        setError(message);
      } finally {
        setIsLoading(false);
      }
    }
  }, [images.length]);

  // Next action
  const next = useCallback(async () => {
    if (isLoading) return;

    // If we're not at the end of cached images, just move forward
    if (currentIndex < images.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setError(null);
    } else {
      // Fetch a new image
      await fetchNewImage();
    }
  }, [currentIndex, images.length, isLoading, fetchNewImage]);

  // Previous action
  const previous = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setError(null);
    } else {
      setError('No more images!');
    }
  }, [currentIndex]);

  // Play action - auto advance every 2 seconds
  const play = useCallback(() => {
    setIsPlaying(true);
    setError(null);
  }, []);

  // Pause action
  const pause = useCallback(() => {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Effect to handle autoplay
  useEffect(() => {
    if (isPlaying && !isLoading) {
      intervalRef.current = window.setInterval(() => {
        next();
      }, SLIDESHOW_INTERVAL);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, isLoading, next]);

  const state: SlideshowState = {
    images,
    currentIndex,
    isPlaying,
    isLoading,
    error,
  };

  const actions: SlideshowActions = {
    play,
    pause,
    next,
    previous,
    fetchInitialImage,
  };

  return [state, actions];
}
