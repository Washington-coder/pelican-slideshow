# 🦩 Pelican Slideshow

A web application that displays a photo slideshow of pelicans using the Unsplash API. Built with React, TypeScript, Tailwind CSS, and Zod for validation.

## Features

- **Auto-play slideshow** with 2-second intervals
- **Manual navigation** with Previous/Next controls
- **Image caching** - keeps the 5 most recent images loaded
- **Loading states** - visual feedback while fetching images
- **Error handling** - graceful error messages including "No more images!" when reaching the beginning
- **Photographer attribution** - proper credit to Unsplash photographers

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Styling
- **Zod** - API response validation
- **Vitest** - Testing framework
- **React Testing Library** - Component testing

## Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **Unsplash API Key** - [Get one here](https://unsplash.com/oauth/applications)

## Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd pelican-slideshow
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Unsplash API Key

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit `.env` and add your Unsplash Access Key:

```env
VITE_UNSPLASH_ACCESS_KEY=your_actual_access_key_here
```

**To get an Unsplash API key:**
1. Create an account at [Unsplash](https://unsplash.com/join)
2. Go to [Your Applications](https://unsplash.com/oauth/applications)
3. Click "New Application"
4. Accept the terms and create your app
5. Copy the "Access Key" from your application page

### 4. Run the development server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Run tests with coverage report
npm run test:coverage
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm test` | Run tests in watch mode |
| `npm run test:run` | Run tests once |
| `npm run test:coverage` | Run tests with coverage |
| `npm run lint` | Run ESLint |

## Project Structure

```
pelican-slideshow/
├── src/
│   ├── api/
│   │   └── unsplash.ts       # Unsplash API client
│   ├── components/
│   │   ├── Slideshow.tsx     # Main slideshow component
│   │   ├── SlideshowControls.tsx  # Play/Pause/Next/Previous buttons
│   │   ├── ImageDisplay.tsx  # Image display with attribution
│   │   ├── LoadingSpinner.tsx # Loading indicator
│   │   └── ErrorMessage.tsx  # Error display
│   ├── hooks/
│   │   └── useSlideshow.ts   # Slideshow state management
│   ├── types/
│   │   └── unsplash.ts       # Zod schemas & TypeScript types
│   ├── test/
│   │   ├── setup.ts          # Test setup
│   │   ├── mocks.ts          # Mock data
│   │   ├── components.test.tsx  # Component tests
│   │   ├── validation.test.ts   # Zod schema tests
│   │   └── useSlideshow.test.ts # Hook tests
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env.example
├── package.json
├── vite.config.ts
└── README.md
```

## What I Built

This slideshow application implements all required functionality:

1. **Initial image fetch** - When the page loads, it fetches and displays a pelican image
2. **Play** - Auto-advances images every 2 seconds
3. **Pause** - Stops auto-advance
4. **Previous** - Shows the previous image from cache, or displays "No more images!" if at the beginning
5. **Next** - Shows the next cached image or fetches a new one
6. **Image caching** - Maintains the 5 most recent images
7. **Loading/Error states** - Visual feedback for API calls and errors
8. **Zod validation** - All API responses are validated with Zod schemas

## Testing Approach

The test suite covers:

- **Component tests** - UI rendering, button clicks, state changes
- **Hook tests** - State management, navigation logic, error handling
- **Schema validation tests** - Zod schema correctness

### How to expand the test suite

With more time, I would add:

1. **Integration tests** - Full user flow testing with mocked API
2. **E2E tests** - Using Playwright or Cypress
3. **Visual regression tests** - Screenshot comparisons
4. **Accessibility tests** - Using axe-core
5. **Performance tests** - Image loading timing, memory usage
6. **More edge cases** - Network failures, rate limiting, slow connections

## What I'd Do Next With More Time

1. **Keyboard navigation** - Arrow keys for previous/next, spacebar for play/pause
2. **Touch gestures** - Swipe support for mobile devices
3. **Image preloading** - Prefetch the next image for smoother transitions
4. **Transition animations** - Fade or slide transitions between images
5. **Fullscreen mode** - Maximize the viewing experience
6. **Image download** - Option to download the current image
7. **Share functionality** - Share current image to social media
8. **Progress indicator** - Visual timer for auto-play countdown
9. **Responsive design improvements** - Better mobile optimization
10. **Error recovery** - Retry button for failed API calls

## License

MIT
