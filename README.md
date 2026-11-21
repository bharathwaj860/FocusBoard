# FocusBoard

FocusBoard is a responsive task dashboard built with React, Vite, JavaScript and CSS.

## Features
- Create, edit and delete tasks (deletion asks for confirmation).
- Update task status: To do, In progress, Completed.
- Search tasks by title.
- Combine status tabs with priority filters.
- Live task statistics and completion percentage.
- Focus Notes carousel with previous/next controls and indicators.
- Task data is saved in and restored from browser localStorage.
- Responsive layout for desktop, tablet and mobile.

## Tech stack
- React with functional components and Hooks
- Vite
- JavaScript
- CSS
- lucide-react icons
- localStorage

## Run locally
1. Install Node.js (LTS recommended).
2. Open this project folder in VS Code.
3. Open the terminal in the project root.
4. Run `npm install`.
5. Run `npm run dev`.
6. Open the local URL printed in the terminal.

## Production build
Run `npm run build`. Vite creates the production files in `dist/`.
Run `npm run preview` to preview the production build locally.

## Project structure
```text
src/
  components/
    FocusNotes.jsx
    StatCard.jsx
    TaskCard.jsx
    TaskForm.jsx
  data/
    sampleTasks.js
  hooks/
    useLocalStorage.js
  App.jsx
  index.css
  main.jsx
```

## State management and persistence
The `App` component owns the task list and filter state with React Hooks. The custom `useLocalStorage` hook reads the saved task array when the app starts and writes the task array whenever it changes. Search and filters are derived from the original task list, so filtered results are not written over saved data.

## Notes
The Focus Notes carousel uses three original sample tips. Replace their wording and adjust spacing/colors against the supplied Figma reference before final submission if exact visual matching is required. This project is frontend-only and does not use a backend or authentication.
