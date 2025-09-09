# 🎬 Movie Discovery App

A modern React application for discovering and tracking trending movies using TMDB API and Appwrite backend.

## ✨ Features

- 🔍 Real-time movie search with debounced API calls
- 📈 Trending movies tracking based on search analytics
- 🎨 Modern UI with Tailwind CSS and custom animations
- 📱 Fully responsive design
- ⚡ Fast performance with Vite
- 🗄️ Backend integration with Appwrite for analytics

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS
- **Backend**: Appwrite (Database, Analytics)
- **API**: The Movie Database (TMDB)
- **Styling**: Custom CSS with Tailwind utilities
- **Build Tool**: Vite with HMR

## 📸 Screenshots

![Home Page](screenshots/home.png)
![Trending Movies](screenshots/trending.png)
![Movie Results](screenshots/movies.png)

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- TMDB API key
- Appwrite account

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/react-app.git
cd react-app
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
cp .env.example .env.local
```

4. Configure your `.env.local`:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_TABLE_ID=your_table_id
```

5. Start the development server

```bash
npm run dev
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Header with hero banner and title
│   ├── MovieCard.jsx       # Individual movie display component
│   ├── MovieList.jsx       # Grid layout for movie cards
│   ├── Search.jsx          # Search input component with debouncing
│   ├── Spinner.jsx         # Loading spinner component
│   └── TrendingMovies.jsx  # Trending movies section
├── services/
│   ├── appwriteService.js  # Appwrite backend integration
│   └── tmdbService.js      # TMDB API service
├── constants/
│   └── api.js              # API endpoints and utilities
├── App.jsx                 # Main application component
├── App.css                 # Application-specific styles
├── main.jsx                # React app entry point
└── index.css               # Global styles and Tailwind config
```

## 🔧 API Integration

### TMDB API (tmdbService.js)

- Movie search and discovery
- Popular movies fetching
- Movie details and metadata
- Centralized API configuration and error handling

### Appwrite Backend (appwriteService.js)

- Search analytics tracking
- Trending movies calculation based on search frequency
- Real-time data updates
- User interaction analytics

### Constants (api.js)

- API endpoints configuration
- Image URL generation utilities
- Request headers and authentication setup

## 📊 Performance Features

- **Debounced search** (500ms delay) - Reduces API calls during typing
- **Optimized API calls** - Centralized service layer with error handling
- **Image lazy loading** - Improved page load performance
- **Responsive design patterns** - Mobile-first approach
- **Component-based architecture** - Reusable and maintainable code structure
- **Search analytics** - Track popular searches for trending insights
