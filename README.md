# 🦩 Pelican Slideshow

A web application that displays a photo slideshow of pelicans using the Unsplash API.

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
