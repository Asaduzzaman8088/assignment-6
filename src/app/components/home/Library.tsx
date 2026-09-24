"use client";

import { useEffect, useState, useMemo } from "react";
import { Loader2 } from "lucide-react";
import WorkoutCard from "./WorkoutCard";
import { Workout } from "@/app/context/WorkoutContext";

export default function Library() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState<"duration" | "caloriesBurned" | "rating">(
    "duration"
  );

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        // Handle both shapes: array OR { data: [...] }
        const list = Array.isArray(data) ? data : data.data ?? [];
        setWorkouts(list);
      } catch (err) {
        console.error(err);
        setError("Failed to load workouts. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchWorkouts();
  }, []);

  // Optimized sort logic with updated property name
  const sortedWorkouts = useMemo(() => {
    return [...workouts].sort((a, b) => {
      if (sortBy === "duration") return a.duration - b.duration;
      if (sortBy === "caloriesBurned") return a.caloriesBurned - b.caloriesBurned;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [workouts, sortBy]);

  return (
    <section id="library" className="container mx-auto px-4 py-12">
      {/* Header + Sort */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-oswald text-3xl font-bold uppercase tracking-tight sm:text-4xl">
            The Library
          </h2>
          <p className="mt-1 text-sm text-neutral-400">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label
            htmlFor="sort"
            className="text-xs font-medium uppercase tracking-wider text-neutral-500"
          >
            Sort By
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as "duration" | "caloriesBurned" | "rating")
            }
            className="cursor-pointer rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-neutral-200 outline-none transition hover:border-lime-400 focus:border-lime-400"
          >
            <option value="duration">Duration</option>
            <option value="caloriesBurned">Calories</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center gap-3 py-24">
          <Loader2 className="h-8 w-8 animate-spin text-lime-400" />
          <p className="text-sm text-neutral-500">Loading workouts…</p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="rounded-xl border border-red-900/50 bg-red-950/20 p-6 text-center text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedWorkouts.map((w) => (
            <WorkoutCard key={w.id} workout={w} />
          ))}
        </div>
      )}
    </section>
  );
}