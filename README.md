# Custom Calendar & Notes Application

This is a refined, hand-built calendar and scheduling tool I developed during my frontend internship assessment. My goal was to build something that feels fast, looks premium, and solves actual usability problems like note organization and mobile responsiveness.

## ✨ All Developed Features

### 📅 Advanced Calendar Engine
- **Full Date Logic**: I wrote the grid rendering from scratch to handle month offsets, varying day counts, and leap years natively without heavy external libraries.
- **Indian Holiday System**: Integrated a curated list of major Indian holidays (Independence Day, Diwali, Holi, etc.). They appear as colored indicator dots with helpful hover tooltips for a quick glance.
- **Smart "Today" Indicator**: Every time the app loads, it finds the current date and marks it with a subtle highlight and a premium blue dot at the bottom of the cell (iOS style).

### 🖼️ Dynamic Visual System
- **Curated 12-Month Carousel**: I personally selected 12 high-quality Unsplash nature images (one for each month) that reflect the seasons and festivals (like a festive firework scene for Diwali month).
- **Zero-Latency Swapping**: To make the app feel instant, I built a background pre-loader that silently caches every single month image the moment the page loads. Switching months is now 100% instant with 0ms lag.
- **Automatic Day/Night Mode**: The app actually checks your local time! If it’s late at night (after 6 PM), the app automatically shifts to a gorgeous Dark Mode to save your eyes.

### 📝 Integrated Notes & Data
- **Date Range Selection**: You can click a single date to plan for it, or click two to select an entire range. The selected boxes utilize a sheer, glassy blue style.
- **Month-Specific Filtering**: I noticed that showing every note ever written was cluttered, so I fixed it! Now, the notes panel only shows the notes belonging to the month you are currently looking at.
- **The "Clear Month" Action**: The Clear button is context-aware—clicking it will reset your current date selection AND wipe out all notes just for that specific month!
- **Persistent Storage**: All notes saved into `localStorage`, so your plans stick around even after a page refresh.

### 📱 Premium UX & Design
- **Fully Responsive Layout**: I built a layout that adapts to your screen. On desktops, the nature banner sits elegantly on the left, while on mobile, it stacks cleanly at the top.
- **Micro-Animations**: Added subtle `transition` effects to everything. Hover over a date cell for a glassy fade, or hover over the main image to see a slow, cinematic zoom effect.
- **Touch-Friendly Targets**: Increased the "tap areas" for all buttons on mobile, and used a responsive grid gap system (`gap-1` on small screens, `gap-2` on large) to keep the grid perfectly uniform.

## 🛠️ Technical Implementation
This project is built using:
- **Next.js 15 (App Router)**
- **React Hooks** (useState, useEffect for state and persistence)
- **Tailwind CSS** (for the precise, glassy design system)

I kept the code extremely clean and human-readable, avoiding complex abstractions where simple, readable logic works best. Every component in `components/` is organized to be maintainable and easy to understand.

## 🚀 Getting Started Locally

1. **Install everything**:
   ```bash
   npm install
   ```

2. **Launch the app**:
   ```bash
   npm run dev
   ```

3. **Enjoy**:
   The app will be live at `http://localhost:3000`. 
