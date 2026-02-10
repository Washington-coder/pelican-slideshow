import type { UnsplashPhoto } from '../types/unsplash';

export const mockPhoto: UnsplashPhoto = {
  id: 'test-photo-1',
  alt_description: 'A beautiful pelican',
  description: 'A pelican flying over the ocean',
  urls: {
    raw: 'https://images.pexels.com/photos/15531819/pexels-photo-15531819/free-photo-of-close-up-of-a-brown-pelican-flying-over-the-sea.jpeg',
    full: 'https://i.ytimg.com/vi/rYXh2S3dPwo/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDBIseU3Ea3feRyBSda2Kqcc9Eoug',
    regular: 'https://i.pinimg.com/736x/14/8e/58/148e5825a8c2f25ad85ac91db0d3fb26.jpg',
    small: 'https://images.unsplash.com/photo-test?small',
    thumb: 'https://i.ytimg.com/vi/xb3RvMApm6g/sddefault.jpg',
  },
  user: {
    id: 'user-1',
    username: 'photographer123',
    name: 'John Photographer',
  },
  width: 4000,
  height: 3000,
};

export const mockPhoto2: UnsplashPhoto = {
  id: 'test-photo-2',
  alt_description: 'Another pelican',
  description: 'A pelican swimming',
  urls: {
    raw: 'https://images.unsplash.com/photo-1751857729881-91de80f97b69?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDMzfHx8ZW58MHx8fHx8',
    full: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Swimming_pelican.jpg',
    regular: 'https://images.pexels.com/photos/18784718/pexels-photo-18784718/free-photo-of-a-pelican-swimming-in-the-water.jpeg',
    small: 'https://images.unsplash.com/photo-test2?small',
    thumb: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmlyZHN8ZW58MHx8MHx8fDA%3D',
  },
  user: {
    id: 'user-2',
    username: 'birdlover',
    name: 'Jane Bird',
  },
  width: 3000,
  height: 2000,
};

export function createMockPhoto(id: string): UnsplashPhoto {
  return {
    ...mockPhoto,
    id,
  };
}
