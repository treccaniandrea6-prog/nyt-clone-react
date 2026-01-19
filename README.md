# NYT Clone — Top Stories (React)

React app that fetches and displays **New York Times Top Stories** by section, with search, pagination and refresh.
Project refined after mentor review to improve maintainability and performance.

## Links

- GitHub Repository: https://github.com/treccaniandrea6-prog/nyt-clone-react
- Live Demo (Netlify): https://dashing-begonia-75e402.netlify.app

## Features

- Top Stories (Home) + sections (World / Business / Technology, etc.)
- Search on title and abstract
- “Load more” client-side pagination
- Refresh per section
- Open article directly on NYT website (external link)
- Global fallback on runtime errors via **Error Boundary**

## Code Review Improvements (Mentor)

Implemented the following improvements to make the project more scalable and production-ready:

- **DRY**: merged duplicated logic from Home and Section into a single reusable page component (`NewsListPage`).
- **Context optimization**: split context into **State** and **Actions** to reduce unnecessary re-renders across consumers.
- **Performance**: memoized `ArticleCard` with `React.memo` to avoid re-rendering unchanged cards.
- **Cache consistency**: single source of truth for caching in reducer state (no redundant refs).
- **Routing simplification**: removed internal `Article` route that only redirected externally; articles open directly on NYT.

## Tech Stack

- React + Vite
- React Router
- Context API
- Axios
- NYT Top Stories API

## Setup (Local)

### 1) Install

```bash
npm install
```
