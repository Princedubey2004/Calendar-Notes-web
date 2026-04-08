# Calendar Application - Assignment Submission 📅

This project is a React-based calendar dashboard built using **Next.js** and **Tailwind CSS**. I wanted to build something that feels more like a "real" product than just a basic calendar assignment, so I focused on a clean side-panel layout and smooth interactions.

---

### Key Features:

- **Side-Panel Dashboard**: Instead of a plain background, I used a side-panel for monthly images (from Unsplash) to give each month its own vibe without distracting from the actual dates.
- **Date Range Selection**: You can select a single date or a range by clicking a start and end date. It's useful for blocking out periods for notes or tasks.
- **Indian Holidays Integration**: I added a list of major Indian holidays for 2026. They show up with a small pulsing dot, and you can hover over them to see the name (like Republic Day or Diwali).
- **Selection Analytics**: When you select a range, there's a small stats bar at the bottom that shows the total days, how many are weekends, and how many notes you've already added for that period.
- **Note Management (CRUD)**: You can add, edit, and delete notes for any selected date/range. I made the editing inline so you don't have to deal with annoying popups.
- **Auto Dark/Light Mode**: The app checks the time and switches themes automatically. After 6 PM, it goes into dark mode to be easier on the eyes.

---

### Tech Decisions I Made:

- **Next.js App Router**: Used the latest Next.js structure because it's standard now and handles routing/loading pretty well.
- **Custom Hook (`useNotes`)**: I moved all the note logic into a custom hook. It handles saving everything to `localStorage` so your data doesn't disappear when you refresh.
- **Modular Components**: I split the UI into `DayCell`, `CalendarHeader`, and `NotesPanel`. It made it way easier to debug the grid logic separately from the note input logic.
- **Tailwind for UI**: I used Tailwind because it allowed me to quickly tweak the spacing and add effects like the glassmorphism on the buttons.

### How to Run:

1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev`
3. Open [http://localhost:3000](http://localhost:3000)

---
*Self-note: Might need to add a manual toggle for dark mode in the next version if I have time.*

