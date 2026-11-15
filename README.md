# Memory

A memory card game for two players, built with TypeScript, SCSS and Vite.

Two players take turns flipping two cards. If the cards match, the player gets a point and may continue. If not, the cards flip back and the other player is up. When all pairs are found, the player with the most points wins – or it's a draw.

## Features

- Start screen with animated controller icon
- Settings: choose the starting player (blue / orange), the board size (16, 24 or 36 cards) and a theme
- 3 themes with their own colors, fonts and card motifs: **Code vibes**, **DA Projects**, **Foods**
- Live preview of the theme when hovering over the options
- Score board with current player and an "Exit game" button with confirmation dialog
- Smooth card flip animation
- Game over screen with the final score, followed by the winner or a draw screen
- Widescreen layout from 1440px

## Tech stack

- [TypeScript](https://www.typescriptlang.org/)
- [SCSS](https://sass-lang.com/) (BEM naming, 7-1-like folder structure)
- [Vite](https://vitejs.dev/) as dev server and build tool

## Getting started

Requirements: [Node.js](https://nodejs.org/) (version 20 or newer) and npm.

```bash
# 1. Clone the repository
git clone https://github.com/strAnge515/memory.git
cd memory

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Then open the URL shown in the terminal (by default `http://localhost:5173/memory/`).

### Build for production

```bash
npm run build     # type check + build into the dist/ folder
npm run preview   # serve the build locally to test it
```

The project is configured with `base: "/memory/"` in `vite.config.ts`, so the content of `dist/` has to be uploaded into a folder called `memory` on the server.

## Project structure

```
memory/
├─ index.html          # empty <main id="app"> + exit dialog
├─ public/             # fonts, icons and card images per theme
└─ src/
   ├─ main.ts          # starts the app on DOMContentLoaded
   ├─ types.ts         # types and interfaces
   ├─ state.ts         # constants, settings and game state
   ├─ templates.ts     # functions that only return HTML
   ├─ render.ts        # renders the screens into #app
   ├─ settings.ts      # settings form logic
   ├─ game.ts          # game logic (cards, scores, winner)
   ├─ dialog.ts        # exit dialog
   └─ styles/          # SCSS (abstract, base, components)
```
