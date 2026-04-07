# Calendar & Notes App

Hey! This is my submission for the frontend calendar assignment. 

I built a simple, interactive calendar and note-taking application. You can view the calendar, click to select a single date or a range of dates, and attach notes to your selection.

## Live Demo & Walkthrough

- **Live Site:** [Insert your Vercel URL here]
- **Video Walkthrough:** [Insert your Loom/Youtube link here]

## Features

- **Custom Range Selection:** Click a start date and an end date to highlight a range. 
- **Notes Panel:** Add notes to any selected day or range. 
- **Local Persistence:** Everything saves to `localStorage`, so if you refresh the page, your notes stick around.
- **Clean UI:** Styled entirely with Tailwind CSS for a modern, responsive layout.

## Tech Stack

- **Next.js** (App Router)
- **React** (Hooks, state management)
- **Tailwind CSS** (Styling)

## Design & Architecture Choices

- **Aesthetic Translation:** Rather than rigidly enforcing a vertical scroll for the hero image like a physical printout, I chose a segmented side-by-side layout (which stacks elegantly into a column on mobile). This honors the source inspiration's balance of imagery and data while utilizing standard desktop screen width properly.
- **State Management:** Kept the state localized specifically inside the `Calendar` component rather than over-engineering a global store, since date ranges logically belong directly alongside the UI. 
- **Data Persistence:** Relied on `localStorage` to save notes. This checks the box for strictly frontend persistence without the overhead of spinning up a database or API, meaning it runs entirely in the client's browser.

## How to Run Locally

If you want to spin this up on your machine and test it out, just follow these steps:

1. Make sure you have Node installed. 
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open up your browser and head to `http://localhost:3000`.

That's pretty much it! Feel free to dig around the code—specifically in the `components/` folder where most of the heavy lifting happens for the custom calendar logic. Let me know what you think!
