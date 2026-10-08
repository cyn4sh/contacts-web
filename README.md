# Contacts Web

Web frontend for the Contacts app, built with React and TypeScript. It will talk to the Django REST Framework API in `contacts-api`.

> **Status:** early development. The project foundation is in place; the Contacts screens are not built yet.

## Tech stack

- React + TypeScript, built with Vite
- Tailwind CSS v4 with a custom dark theme (design tokens live in `src/index.css`)
- Manrope font, self-hosted through Fontsource
- ESLint

Planned: TanStack Query for server data, and TypeScript types generated from the backend's OpenAPI schema.

## Getting started

Developed with Node.js 24 and npm 11.

```bash
npm install
npm run dev
```

The app runs at http://localhost:5173.

## Scripts

- `npm run dev` starts the development server
- `npm run build` creates a production build
- `npm run lint` runs ESLint
- `npm run preview` previews the production build locally

## Environment variables

Not needed yet. They will be documented here once the API connection is added.
