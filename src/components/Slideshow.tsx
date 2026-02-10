import { useEffect } from 'react';
import { useSlideshow } from '../hooks/useSlideshow';
import { SlideshowControls } from './SlideshowControls';
import { ImageDisplay } from './ImageDisplay';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';

/**
 * Main Slideshow component that orchestrates the pelican image slideshow
 */
export function Slideshow() {
  const [state, actions] = useSlideshow();
  const { images, currentIndex, isPlaying, isLoading, error } = state;
  const { play, pause, next, previous, fetchInitialImage } = actions;

  // Fetch initial image when component mounts
  useEffect(() => {
    fetchInitialImage();
  }, [fetchInitialImage]);

  const currentImage = images[currentIndex];
  const hasImages = images.length > 0;
  const canGoPrevious = currentIndex > 0;
  const imagePosition = hasImages ? `${currentIndex + 1} / ${images.length}` : '0 / 0';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            🦩 Pelican Slideshow
          </h1>
          <p className="text-blue-200 text-lg">
            Beautiful pelican photos from Unsplash
          </p>
        </header>

        {/* Main Content */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
          {/* Image Container */}
          <div className="relative aspect-video bg-black/20 flex items-center justify-center">
            {isLoading && !currentImage && (
              <LoadingSpinner />
            )}

            {currentImage && (
              <ImageDisplay
                image={currentImage}
                isLoading={isLoading}
              />
            )}

            {!isLoading && !currentImage && !error && (
              <p className="text-white/60 text-lg">No image loaded</p>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <ErrorMessage message={error} />
          )}

          {/* Image Counter */}
          <div className="text-center py-2 bg-black/10">
            <span className="text-blue-100 text-sm font-medium">
              Image {imagePosition} (cached: {images.length}/5)
            </span>
          </div>

          {/* Controls */}
          <SlideshowControls
            isPlaying={isPlaying}
            isLoading={isLoading}
            canGoPrevious={canGoPrevious}
            onPlay={play}
            onPause={pause}
            onNext={next}
            onPrevious={previous}
          />
        </div>

        {/* Footer */}
        <footer className="text-center mt-6 text-blue-200 text-sm">
          <p>Powered by Unsplash API</p>
        </footer>
      </div>
    </div>
  );
}
