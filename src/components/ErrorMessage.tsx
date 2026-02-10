interface ErrorMessageProps {
  message: string;
}

/**
 * Displays error messages in the slideshow
 */
export function ErrorMessage({ message }: ErrorMessageProps) {
  const isNoMoreImages = message === 'No more images!';

  return (
    <div
      className={`
        px-4 py-3 mx-4 my-2 rounded-lg text-center font-medium
        ${isNoMoreImages
          ? 'bg-yellow-500/20 text-yellow-200 border border-yellow-500/30'
          : 'bg-red-500/20 text-red-200 border border-red-500/30'
        }
      `}
      role="alert"
      data-testid="error-message"
    >
      <span className="mr-2">
        {isNoMoreImages ? '⚠️' : '❌'}
      </span>
      {message}
    </div>
  );
}
