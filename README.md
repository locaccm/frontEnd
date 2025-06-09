# Calendar Frontend

This repository contains the React + TypeScript frontend for the Calendar Management application. It provides calendar views (Day, Week, Month, Year) and a form to create, update, and delete events for tenants and accommodations.

## Features

- Responsive calendar views: Day, Week, Month, Year
- Support for single-day and multi-day events
- Tenant and accommodation dropdown selectors
- Inline error handling without layout shifts
- Integration with backend REST API via Axios

## Prerequisites

- Node.js v16 or higher
- npm or Yarn
- Running backend server (default at `http://localhost:3000`, configurable via `.env`)

## Setup & Run

1. Clone the repository and install dependencies:

   ```bash
   git clone <repository-url> frontEnd
   cd frontEnd
   npm install
   ```

2. Copy and configure environment variables:

   ```bash
   cp .env.example .env
   # Set VITE_API_URL=http://localhost:3000 and VITE_API_KEY if needed
   ```

3. Start the development server:

   ```bash
   npm run dev
   # The app runs at http://localhost:5173
   ```

4. Build for production:

   ```bash
   npm run build
   ```

5. Preview production build:

   ```bash
   npm run preview
   ```

## Available Scripts

- `npm run dev`: Start development server (Vite)
- `npm run build`: Build the app for production
- `npm run preview`: Preview the production build
- `npm test`: Run unit tests with coverage
- `npm run lint`: Lint the codebase
- `npm run coverage`: Generate test coverage report

## Environment Variables

Configure API connection in `.env`:

```bash
VITE_API_URL=http://localhost:3000
VITE_API_KEY=<your_api_key>
```

## API Endpoints

Defined in `src/services/api.service.ts`:

- `GET /calendar/day?date=YYYY-MM-DD`: Fetch events for a specific day
- `GET /calendar/week?date=YYYY-MM-DD`: Fetch events for a week (or use `week` & `year`)
- `GET /calendar/month?month=1-12&year=YYYY`: Fetch events for a month (or use `date`)
- `POST /events`: Create a new event
- `PUT /events/:id`: Update an existing event
- `DELETE /events/:id`: Delete an event
- `GET /events/filter?...`: Filter events by tenant (`usager`), accommodation (`logement`), or date range

## Project Structure

```
frontEnd/
├── public/            Static assets and index.html
├── src/
│   ├── components/    Reusable React components
│   ├── pages/         Page components (Calendar.tsx, etc.)
│   ├── services/      API client and service modules
│   ├── styles/        CSS styling
│   ├── tests/         Unit and integration tests
│   └── main.tsx       App entry point
├── .env.example       Example environment variables
├── tsconfig.json      TypeScript configuration
├── vite.config.ts     Vite configuration
├── package.json       Scripts and dependencies
└── README.md          Project documentation
```

## Contributing

Contributions welcome! Please open issues and pull requests. Ensure all code is in English, including comments and documentation, and passes linting and tests.
