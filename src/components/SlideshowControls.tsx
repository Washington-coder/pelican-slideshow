interface SlideshowControlsProps {
  isPlaying: boolean;
  isLoading: boolean;
  canGoPrevious: boolean;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

/**
 * Control buttons for the slideshow: Play, Pause, Previous, Next
 */
export function SlideshowControls({
  isPlaying,
  isLoading,
  canGoPrevious: _canGoPrevious,
  onPlay,
  onPause,
  onNext,
  onPrevious,
}: SlideshowControlsProps) {
  // canGoPrevious could be used to disable the Previous button visually
  void _canGoPrevious;
  const buttonBaseClass = `
    px-6 py-3 rounded-xl font-semibold text-lg
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const primaryButtonClass = `
    ${buttonBaseClass}
    bg-blue-500 hover:bg-blue-600 text-white
    focus:ring-blue-400
    active:scale-95
    cursor-pointer
  `;

  const secondaryButtonClass = `
    ${buttonBaseClass}
    bg-white/20 hover:bg-white/30 text-white
    focus:ring-white/50
    active:scale-95
    cursor-pointer
  `;

  return (
    <div className="flex items-center justify-center gap-4 p-6 bg-black/20">
      {/* Previous Button */}
      <button
        onClick={onPrevious}
        disabled={isLoading}
        className={secondaryButtonClass}
        aria-label="Previous image"
        data-testid="previous-button"
      >
        <span className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Previous
        </span>
      </button>

      {/* Play/Pause Button */}
      {isPlaying ? (
        <button
          onClick={onPause}
          className={primaryButtonClass}
          aria-label="Pause slideshow"
          data-testid="pause-button"
        >
          <span className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Pause
          </span>
        </button>
      ) : (
        <button
          onClick={onPlay}
          disabled={isLoading}
          className={primaryButtonClass}
          aria-label="Play slideshow"
          data-testid="play-button"
        >
          <span className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
            Play
          </span>
        </button>
      )}

      {/* Next Button */}
      <button
        onClick={onNext}
        disabled={isLoading}
        className={secondaryButtonClass}
        aria-label="Next image"
        data-testid="next-button"
      >
        <span className="flex items-center gap-2">
          Next
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </button>
    </div>
  );
}
