/**
 * Loading spinner displayed while fetching images
 */
export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-4" data-testid="loading-spinner">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-300/30 border-t-blue-300" />
      <p className="text-white/80 text-lg font-medium animate-pulse">
        Loading pelican image...
      </p>
    </div>
  );
}
