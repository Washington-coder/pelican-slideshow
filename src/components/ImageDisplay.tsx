import type { UnsplashPhoto } from '../types/unsplash';

interface ImageDisplayProps {
  image: UnsplashPhoto;
  isLoading: boolean;
}

/**
 * Displays the current slideshow image with photographer attribution
 */
export function ImageDisplay({ image, isLoading }: ImageDisplayProps) {
  return (
    <div className="relative w-full h-full">
      {/* Main Image */}
      <img
        src={image.urls.regular}
        alt={image.alt_description || 'Pelican photo'}
        className={`
          w-full h-full object-contain
          transition-opacity duration-300
          ${isLoading ? 'opacity-50' : 'opacity-100'}
        `}
        data-testid="slideshow-image"
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-white/30 border-t-white" />
        </div>
      )}

      {/* Photographer Attribution */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
        <p className="text-white text-sm">
          Photo by{' '}
          <a
            href={`https://unsplash.com/@${image.user.username}?utm_source=pelican_slideshow&utm_medium=referral`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:underline"
          >
            {image.user.name}
          </a>
          {' '}on{' '}
          <a
            href="https://unsplash.com?utm_source=pelican_slideshow&utm_medium=referral"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:underline"
          >
            Unsplash
          </a>
        </p>
        {image.description && (
          <p className="text-white/70 text-xs mt-1 line-clamp-2">
            {image.description}
          </p>
        )}
      </div>
    </div>
  );
}
