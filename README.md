# Premium Dynamic Calendar Dashboard 📅

This is a clean, production-ready calendar application built with **React (Next.js)** and **Tailwind CSS**. I focused on creating a balanced, high-end "Product" experience rather than just a basic grid. 

The core idea was to blend beautiful monthly imagery with a sharp, high-contrast calendar interface that actually feels fast and tactile to use.

---

### Main Features I Built:

✨ **Product-Level Layout (Side-Panel Design)**
- Replaced the typical "full background" look with a dedicated Side-Panel for monthly images. This keeps the calendar dates and notes 100% readable while maintaining the monthly vibe on the left.
- **Cinematic Visuals**: Added a 700ms zoom effect and a custom multi-stage gradient overlay (from-black/40) to the images for that premium gallery feel.

🛡️ **Robust Date Logic & Range Selection**
- Built a custom date-range selection engine. You can click a start date and an end date to instantly capture a period.
- **Indian Holiday Integration**: Automatically flags major holidays (Republic Day, Holi, etc.) with custom icons and tooltips.
- **Smart Today Marker**: Today’s date is automatically highlighted with a bold blue ring and a subtle dot indicator.

📊 **Dynamic Selection Analytics (The Stats Tray)**
- Added a live analytics line below the grid that calculates:
    - **Total Duration**: The number of days in your selection.
    - **Weekend Count**: Automatically flags Saturdays and Sundays for vacation/study planning.
    - **Associated Notes**: Tells you how many schedules are already tied to that specific period.

📝 **Advanced Schedule Management (Full CRUD)**
- **Inline Modal-less Editing**: You can edit your notes directly inside the list without any annoying popups. The text field replaces the static text instantly when you click "Edit."
- **Persistent Storage**: All notes and ranges are saved to `localStorage`, so your data stays right where you left it on refresh.

🌘 **Automatic Adaptive Identity (Theme-Aware)**
- The entire app automatically switches between a clean "Day Mode" and a professional "Night Mode" (bg-gray-900) based on your local system time.

---

### UI & Micro-Interactions:
I spent a lot of time on the "feel" of the app to make it stand out:
- **Glassmorphism Accents**: All navigation and action buttons use a `bg-white/10 backdrop-blur` logic for that high-end Apple-style translucency.
- **Tactile Grid**: Added `hover:scale-105` and `hover:shadow-lg` animations to every day cell.
- **Deep Depth**: Applied a massive custom shadow (`shadow-[0_10px_40px_rgba(0,0,0,0.3)]`) to the main container to give it a significant floating presence.

---

### How I Built It:
- **Core**: Next.js (App Router), React Hooks (`useState`, `useEffect`, `useMemo`).
- **Styling**: Tailwind CSS with custom utility classes for shadows and gradients.
- **Architecture**: Separated logic into modular components (`DayCell`, `CalendarHeader`, `NotesPanel`) to keep the code clean and maintainable.
- **Authored By**: 100% human-crafted logic and styling decisions.
