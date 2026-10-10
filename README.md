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

Copy the example file and adjust it if your backend runs elsewhere:

```bash
cp .env.example .env
```

| Variable | Purpose | Example |
| --- | --- | --- |
| `VITE_API_URL` | Base URL of the Contacts API (no trailing slash) | `http://127.0.0.1:8000` |

Variables starting with `VITE_` are bundled into the browser build and are public, so never put secrets in them.

## Backend

The API lives in the separate `contacts-api` repository. Run it locally and generate the API types with:

```bash
npm run generate:api
```

The backend must be running at the address in `.env` when you generate types.
