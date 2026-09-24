FitLog: Workout Library

A dark, no-nonsense workout library built with Next.js. Pick a lift, lock it into today's plan, and watch the week's work add up.

Live Demo:
Vercel URL:https://assignment-6-one-phi.vercel.app/

Features:
1. Browse 12+ Workouts** — Full library with images, muscle groups, and stats loaded live from the API
2. Dynamic Details Pages** — Click any workout to see equipment, difficulty, sets, reps, instructions, and ratings
3. Today's Plan (max 5 lifts)** — Add workouts to your daily plan with live metrics for exercises, minutes, and calories
4. Save for Later** — Bookmark workouts you love and access them from your Saved tab
5. Sort & Persist** — Sort by duration, calories, or rating; all plan/saved data persists across reloads via localStorage

Tech Stack:

Next.js 16 (App Router + Turbopack)
React 19
TypeScript
Tailwind CSS v4
React Context API (global state)
react-hot-toast (notifications)
lucide-react (icons)

API:

All workouts**: https://api.abcz.workers.dev/api/fitlog
Single workout**: https://api.abcz.workers.dev/api/fitlog/:id

Getting Started:

```bash
npm install
npm run dev