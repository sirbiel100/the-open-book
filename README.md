# The Open Book — Assignment 2

A React + Tailwind rebuild of the original **The Open Book** independent bookstore site. The original warm cream, brown, and muted red visual identity, book selection, staff picks, events, and about content have been retained.

## Tech stack

- Vite
- React with JavaScript (no TypeScript)
- Tailwind CSS v4 with the official Vite plugin
- Plasma UI (`@cruxgarden/plasma-ui`) for liquid-glass surfaces
- Hardcoded data arrays; no backend or extra UI framework

## Getting started

**Requirements:** Node.js 22 or newer is recommended because the current Plasma UI package requires Node 22+.

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Project structure

```text
the-open-book/
├── public/
│   └── images/                 # Book cover JPGs from Assignment 1
├── src/
│   ├── components/
│   │   ├── BookCard.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── MainContent.jsx
│   │   └── SaveToggle.jsx
│   ├── data/
│   │   └── storeData.js        # Books, staff picks, and events arrays
│   ├── App.jsx
│   ├── index.css               # Tailwind import and minimal global reset
│   └── main.jsx                # React entry point and PlasmaProvider
├── index.html
├── package.json
└── vite.config.js
```

## Assignment requirements

- **Vite + React:** app is bootstrapped in `src/main.jsx`.
- **Components:** header, hero, main content, and footer are separate components.
- **Data-driven lists:** books, staff picks, and events are arrays in `src/data/storeData.js` and rendered with `.map()`.
- **Tailwind:** styles use utility classes; the old Assignment 1 `style/style.css` is not used.
- **Real filter with `useState`:** category buttons filter the main book grid by All, Fiction, or Nonfiction.
- **Reusable controlled component:** `SaveToggle` receives `checked` and `onChange` props. Its checkbox is controlled by the parent state in `MainContent`.
- **Mobile-first layout:** unprefixed Tailwind utilities define the mobile layout; `sm:`, `md:`, and `lg:` add larger-screen layouts.
- **No horizontal overflow:** responsive grids, wrapping navigation, `min-w-0`, and `overflow-x: clip` guard against horizontal scrolling.

## How the state works

### Category filter

`MainContent.jsx` stores the selected category in `activeCategory`. Clicking a filter button calls `setActiveCategory(category)`. React re-renders the component, and `filteredBooks` is recalculated from the `books` array.

### Controlled SaveToggle

`MainContent.jsx` owns `savedBookIds`, an array of saved book IDs. Each `BookCard` receives a `saved` boolean and an `onSavedChange` callback. `SaveToggle` passes the checkbox's new boolean value to its parent. The parent updates the ID array with `setSavedBookIds`, then passes the new value back down as `checked`. This parent → child props → callback → parent state cycle is what makes it a controlled component.

## Plasma UI notes

The official package is installed as a dependency and `PlasmaProvider` wraps the React app in `src/main.jsx`. Actual `Plasma` surfaces are used for the header, featured book, catalogue cards, staff picks, event cards, about panel, and footer.

Plasma UI uses WebGL and its documentation notes that the effect is GPU-intensive, especially on mobile. The project uses a reduced quality setting and a limited surface count. If a particular phone struggles, reduce the number of `<Plasma>` surfaces or use ordinary Tailwind-styled elements on mobile. The layout and controls remain ordinary semantic HTML.

## Suggested small commits

1. `chore: scaffold Vite React app and configure Tailwind`
2. `feat: add bookstore data and reusable page components`
3. `feat: add category filter with useState`
4. `feat: add controlled save-book toggle`
5. `feat: integrate Plasma UI surfaces`
6. `style: refine responsive layouts and check overflow`

Make these commits as you complete and understand each step; do not create them all at once just to simulate progress.
