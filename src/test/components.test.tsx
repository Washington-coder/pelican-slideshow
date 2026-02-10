import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SlideshowControls } from '../components/SlideshowControls';
import { ImageDisplay } from '../components/ImageDisplay';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { mockPhoto } from './mocks';

describe('SlideshowControls', () => {
  const defaultProps = {
    isPlaying: false,
    isLoading: false,
    canGoPrevious: true,
    onPlay: vi.fn(),
    onPause: vi.fn(),
    onNext: vi.fn(),
    onPrevious: vi.fn(),
  };

  it('renders play button when not playing', () => {
    render(<SlideshowControls {...defaultProps} />);
    expect(screen.getByTestId('play-button')).toBeInTheDocument();
    expect(screen.queryByTestId('pause-button')).not.toBeInTheDocument();
  });

  it('renders pause button when playing', () => {
    render(<SlideshowControls {...defaultProps} isPlaying={true} />);
    expect(screen.getByTestId('pause-button')).toBeInTheDocument();
    expect(screen.queryByTestId('play-button')).not.toBeInTheDocument();
  });

  it('calls onPlay when play button is clicked', () => {
    const onPlay = vi.fn();
    render(<SlideshowControls {...defaultProps} onPlay={onPlay} />);
    fireEvent.click(screen.getByTestId('play-button'));
    expect(onPlay).toHaveBeenCalledTimes(1);
  });

  it('calls onPause when pause button is clicked', () => {
    const onPause = vi.fn();
    render(<SlideshowControls {...defaultProps} isPlaying={true} onPause={onPause} />);
    fireEvent.click(screen.getByTestId('pause-button'));
    expect(onPause).toHaveBeenCalledTimes(1);
  });

  it('calls onNext when next button is clicked', () => {
    const onNext = vi.fn();
    render(<SlideshowControls {...defaultProps} onNext={onNext} />);
    fireEvent.click(screen.getByTestId('next-button'));
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it('calls onPrevious when previous button is clicked', () => {
    const onPrevious = vi.fn();
    render(<SlideshowControls {...defaultProps} onPrevious={onPrevious} />);
    fireEvent.click(screen.getByTestId('previous-button'));
    expect(onPrevious).toHaveBeenCalledTimes(1);
  });

  it('disables buttons when loading', () => {
    render(<SlideshowControls {...defaultProps} isLoading={true} />);
    expect(screen.getByTestId('play-button')).toBeDisabled();
    expect(screen.getByTestId('next-button')).toBeDisabled();
    expect(screen.getByTestId('previous-button')).toBeDisabled();
  });
});

describe('ImageDisplay', () => {
  it('renders image with correct src and alt', () => {
    render(<ImageDisplay image={mockPhoto} isLoading={false} />);
    const img = screen.getByTestId('slideshow-image');
    expect(img).toHaveAttribute('src', mockPhoto.urls.regular);
    expect(img).toHaveAttribute('alt', mockPhoto.alt_description);
  });

  it('renders photographer attribution', () => {
    render(<ImageDisplay image={mockPhoto} isLoading={false} />);
    expect(screen.getByText(mockPhoto.user.name)).toBeInTheDocument();
    expect(screen.getByText('Unsplash')).toBeInTheDocument();
  });

  it('shows loading overlay when loading', () => {
    render(<ImageDisplay image={mockPhoto} isLoading={true} />);
    const img = screen.getByTestId('slideshow-image');
    expect(img.className).toContain('opacity-50');
  });
});

describe('LoadingSpinner', () => {
  it('renders loading spinner', () => {
    render(<LoadingSpinner />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    expect(screen.getByText('Loading pelican image...')).toBeInTheDocument();
  });
});

describe('ErrorMessage', () => {
  it('renders error message', () => {
    render(<ErrorMessage message="Test error" />);
    expect(screen.getByTestId('error-message')).toBeInTheDocument();
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });

  it('shows "No more images!" message with warning style', () => {
    render(<ErrorMessage message="No more images!" />);
    const element = screen.getByTestId('error-message');
    expect(element).toHaveTextContent('No more images!');
    expect(element.className).toContain('yellow');
  });

  it('shows other errors with error style', () => {
    render(<ErrorMessage message="API Error" />);
    const element = screen.getByTestId('error-message');
    expect(element.className).toContain('red');
  });
});
