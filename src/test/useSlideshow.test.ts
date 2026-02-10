import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSlideshow } from '../hooks/useSlideshow';
import * as unsplashApi from '../api/unsplash';
import { mockPhoto, mockPhoto2 } from './mocks';

// Mock the API module
vi.mock('../api/unsplash', () => {
  class MockUnsplashApiError extends Error {
    statusCode?: number;
    constructor(message: string, statusCode?: number) {
      super(message);
      this.name = 'UnsplashApiError';
      this.statusCode = statusCode;
    }
  }
  return {
    fetchRandomPelicanImage: vi.fn(),
    UnsplashApiError: MockUnsplashApiError,
  };
});

describe('useSlideshow', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('initializes with default state', () => {
    vi.mocked(unsplashApi.fetchRandomPelicanImage).mockResolvedValue(mockPhoto);
    
    const { result } = renderHook(() => useSlideshow());
    const [state] = result.current;

    expect(state.images).toEqual([]);
    expect(state.currentIndex).toBe(0);
    expect(state.isPlaying).toBe(false);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('fetches initial image', async () => {
    vi.mocked(unsplashApi.fetchRandomPelicanImage).mockResolvedValue(mockPhoto);

    const { result } = renderHook(() => useSlideshow());
    const [, actions] = result.current;

    await act(async () => {
      await actions.fetchInitialImage();
    });

    const [state] = result.current;
    expect(state.images).toHaveLength(1);
    expect(state.images[0]).toEqual(mockPhoto);
  });

  it('handles API errors during fetch', async () => {
    const errorMessage = 'API Error';
    vi.mocked(unsplashApi.fetchRandomPelicanImage).mockRejectedValue(
      new unsplashApi.UnsplashApiError(errorMessage)
    );

    const { result } = renderHook(() => useSlideshow());
    const [, actions] = result.current;

    await act(async () => {
      await actions.fetchInitialImage();
    });

    const [state] = result.current;
    expect(state.error).toBe(errorMessage);
  });

  it('navigates to previous image', async () => {
    vi.mocked(unsplashApi.fetchRandomPelicanImage)
      .mockResolvedValueOnce(mockPhoto)
      .mockResolvedValueOnce(mockPhoto2);

    const { result } = renderHook(() => useSlideshow());

    // Fetch two images
    await act(async () => {
      await result.current[1].fetchInitialImage();
    });
    await act(async () => {
      await result.current[1].next();
    });

    // Navigate to previous
    act(() => {
      result.current[1].previous();
    });

    expect(result.current[0].currentIndex).toBe(0);
  });

  it('shows error when no previous images available', async () => {
    vi.mocked(unsplashApi.fetchRandomPelicanImage).mockResolvedValue(mockPhoto);

    const { result } = renderHook(() => useSlideshow());
    
    await act(async () => {
      await result.current[1].fetchInitialImage();
    });

    // Try to go previous when at first image
    act(() => {
      result.current[1].previous();
    });

    expect(result.current[0].error).toBe('No more images!');
  });

  it('toggles play/pause state', async () => {
    vi.mocked(unsplashApi.fetchRandomPelicanImage).mockResolvedValue(mockPhoto);

    const { result } = renderHook(() => useSlideshow());
    
    await act(async () => {
      await result.current[1].fetchInitialImage();
    });

    // Play
    act(() => {
      result.current[1].play();
    });
    expect(result.current[0].isPlaying).toBe(true);

    // Pause
    act(() => {
      result.current[1].pause();
    });
    expect(result.current[0].isPlaying).toBe(false);
  });
});
