# Getting Started

This guide covers setting up Timelyts on your machine, running it in development, testing it, building it for production and deploying it.

- [Prerequisites](#prerequisites)
- [Install](#install)
- [Run the development server](#run-the-development-server)
- [Tour of the app](#tour-of-the-app)
- [Run the tests](#run-the-tests)
- [Build for production](#build-for-production)
- [Serving the production build](#serving-the-production-build)
- [Continuous integration](#continuous-integration)
- [Deploying to Heroku](#deploying-to-heroku)
- [Configuration](#configuration)
- [Adding a new page](#adding-a-new-page)
- [Troubleshooting](#troubleshooting)

## Prerequisites

| Tool | Version | Notes |
|---|---|---|
| [Node.js](https://nodejs.org/) | 16.x or newer | CI builds on 16.x. The app has also been built and run on Node 22. |
| npm | Bundled with Node | The repo ships a `package-lock.json`; use npm rather than Yarn or pnpm. |
| Git | Any recent version | |
| Browser | Recent Chrome, Edge, Firefox or Safari | Matches the `browserslist` development targets. |

Check your versions:

```bash
node -v
```

```bash
npm -v
```

## Install

Clone the repository and install dependencies from the lockfile:

```bash
git clone <repository-url> timelyts
```

```bash
cd timelyts
```

```bash
npm ci
```

Use `npm ci` rather than `npm install`. `package.json` pins `@mui/material`, `@emotion/react` and `@emotion/styled` to `latest`, so `npm install` can pull newer major versions than the ones the app was written against. `npm ci` installs exactly the versions in `package-lock.json`.

Installation takes a couple of minutes and prints deprecation warnings from old transitive packages. These are expected and harmless.

## Run the development server

```bash
npm start
```

This runs `react-scripts start`, which:

- compiles the TypeScript/JSX with webpack and Babel,
- serves the app at **http://localhost:3000**,
- reloads the page when you save a file,
- prints type and ESLint warnings in the terminal and browser console.

To stop the server, press `Ctrl+C`.

To use a different port, set `PORT` before starting:

```bash
PORT=4000 npm start
```

In PowerShell: `$env:PORT=4000; npm start`.

## Tour of the app

Once the server is running, every page can be reached from the menu button (top left) or by URL:

| URL | Page | What you'll see |
|---|---|---|
| `/` | Home | Cards for each published session type |
| `/publish` | Publish | Choice of One-on-One, Group, Collective or Round Robin |
| `/publish/create/:type` | New session type | Name, location, description, link and colour form |
| `/publish/edit/:id` | Edit session type | Accordion of all session settings |
| `/schedules` | Schedules | Availability schedules with a weekly time editor |
| `/subscriptions` | Subscriptions | Bookings grouped by date (Upcoming / Pending / Past) |
| `/contacts` | Contacts | Invitees (Upcoming / Prospects / All) |
| `/automations` | Automations | Email and SMS reminder workflows |
| `/booking-page` | Booking page | What an invitee sees when booking |
| `/profile`, `/signin` | Placeholders | Plain text only |

![Navigation drawer](images/navigation-drawer.jpg)

All data shown is sample data hard-coded in `src/routes/*.tsx`. Nothing you enter is saved.

## Run the tests

Interactive watch mode (re-runs on save):

```bash
npm test
```

Single run, for CI or scripts:

```bash
npx react-scripts test --watchAll=false
```

Tests use Jest with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/); `src/setupTests.ts` loads the `jest-dom` matchers. Test files live next to the code and end in `.test.tsx`.

> **Currently failing:** the only test, `src/App.test.tsx`, is the Create React App template test that looks for a "learn react" link. That link no longer exists, so the suite reports `1 failed`. Replace it with a real test of `App` to get a green run. Note that `App` renders an `<Outlet/>` and router links, so wrap it in a `MemoryRouter` in tests.

## Build for production

```bash
npm run build
```

This writes a minified, content-hashed bundle to `build/` (about 220 kB of gzipped JavaScript). The build currently succeeds with a list of ESLint `no-unused-vars` warnings. They don't block the build locally or in Azure Pipelines. Many CI services (GitHub Actions, for example) set `CI=true`, though, and CRA treats warnings as errors in that mode. See [Troubleshooting](#build-fails-in-ci-with-treating-warnings-as-errors).

The build assumes it is hosted at `/`. To host under a sub-path, set `"homepage"` in `package.json`.

## Serving the production build

### Option A: any static server

The quickest way to check a production build locally:

```bash
npx serve -s build
```

`-s` enables single-page-app fallback, so deep links like `/publish/edit/1` resolve to `index.html` and React Router takes over.

### Option B: the bundled Express server

`server/server.js` is a minimal Express app that serves static files and falls back to `index.html` for any unknown path:

```bash
node server/server.js
```

It listens on `process.env.PORT` or **3001** and logs `Server is up!`.

> **Known issue:** the server currently serves `public/` rather than `build/`:
>
> ```js
> const publicPath = path.join(__dirname, '..', 'public');
> ```
>
> `public/index.html` is the uncompiled template, so this serves a blank page. To serve the real app, change `'public'` to `'build'` and run `npm run build` first.

## Continuous integration

`azure-pipelines.yml` runs on every push to `main`:

1. Uses an `ubuntu-latest` agent.
2. Installs Node.js 16.x.
3. Runs `npm install` and `npm run build`.

The pipeline only builds; it doesn't run tests or publish artifacts. See [architecture.md](architecture.md#build-and-delivery-pipeline) for a diagram.

## Deploying to Heroku

The project's Heroku app is named `timelyts`. With the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed:

```bash
heroku login
```

```bash
heroku git:remote -a timelyts
```

```bash
git push heroku main
```

Heroku's Node buildpack runs `npm run build` automatically when a `build` script exists, then starts the app with `npm start`. In this repo `npm start` launches the **development** server. For a production deploy, either:

- add a `Procfile` containing `web: node server/server.js` (after fixing the server path as described above), or
- change the `start` script to run the Express server and move the dev command to something like `npm run dev`.

## Configuration

The app reads no environment variables at runtime yet. The only ones that matter today are:

| Variable | Used by | Default | Purpose |
|---|---|---|---|
| `PORT` | `npm start` | 3000 | Dev server port |
| `PORT` | `server/server.js` | 3001 | Express server port |
| `BROWSER` | `npm start` | system default | Set to `none` to stop CRA opening a browser tab |

When the app gains an API, follow the CRA convention: variables must start with `REACT_APP_` (for example `REACT_APP_API_URL`) and go in a `.env.local` file, which `.gitignore` already excludes. They are inlined at build time, so never put secrets in them.

## Adding a new page

1. Create a component in `src/routes/`, for example `src/routes/Analytics.tsx`. Match the existing pages: wrap content in an MUI `Box` with `paddingTop: 12` so it clears the fixed app bar.
2. Register the route in `src/index.tsx`, inside the `<Route path="/*" element={<App />}>` parent so it gets the app bar and theme:

   ```tsx
   <Route path="analytics" element={<Analytics />} />
   ```

3. Add a navigation entry in `src/components/PersistentDrawer.tsx`. The drawer builds each link from its label (`'Analytics'` becomes `/analytics`), so add the label to the array and an icon to the `map1` icon map.
4. Put reusable pieces in `src/components/`. Put pieces used by only one feature in a `components/` folder next to that feature's routes, as `src/routes/publish/components/` does.

## Troubleshooting

### Port 3000 is already in use

CRA offers to run on another port. Answer `Y`, or free the port, or start with a different `PORT`.

### MUI type errors or broken styles after `npm install`

`@mui/material` and `@emotion/*` are pinned to `latest`. Run `git checkout package-lock.json` and then `npm ci` to restore the known-good versions.

### Build fails in CI with "Treating warnings as errors"

When `CI=true`, `react-scripts build` fails on ESLint warnings, and the codebase currently has several `no-unused-vars` warnings. Either remove the unused imports or variables, or set `CI=false` for the build step.

### Deep links return 404 in production

Your static host must fall back to `index.html` for unknown paths: `serve -s`, the Express catch-all route, or the equivalent rewrite rule on your host.

### The dark mode switch doesn't change the theme on the first click

This is a known bug: the handler reads the checkbox state from before the click. Toggle again. See [Known limitations](../README.md#known-limitations).

### Icons and buttons look yellow and backgrounds are solid black

Windows contrast themes (Settings > Accessibility > Contrast themes) make Edge and Chrome render pages in forced-colors mode, which overrides the app's MUI colors. This is expected browser behavior, not an app bug. Turn the contrast theme off to see the real theme colors.

### Windows line-ending or path issues

The project builds on Windows with npm. In Git Bash, use `/` path separators. In PowerShell, set environment variables with `$env:NAME=value` rather than `NAME=value command`.
