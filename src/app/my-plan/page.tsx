"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { Clock, Flame, Star, Trash2, Check, Eye } from "lucide-react";
import { useWorkout } from "@/app/context/WorkoutContext";

export default function MyPlanPage() {
  const {
    myPlan,
    saved,
    removeFromPlan,
    removeSaved,
    markDone,
    doneIds,
  } = useWorkout();

  const [tab, setTab] = useState<"plan" | "saved">("plan");

  const list = tab === "plan" ? myPlan : saved;

  // Live metrics — computed from myPlan only
  const totalExercises = myPlan.length;
  const totalMinutes = myPlan.reduce((sum, w) => sum + (w.duration || 0), 0);
  const totalCalories = myPlan.reduce(
    (sum, w) => sum + (w.caloriesBurned || 0),
    0
  );

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Header */}
      <h1 className="font-oswald text-3xl font-bold uppercase tracking-tight sm:text-4xl">
        My Plan
      </h1>
      <p className="mt-1 text-sm text-neutral-400">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      {/* Metrics row */}
      <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
        <StatCard label="Exercises" value={totalExercises} />
        <StatCard label="Minutes" value={totalMinutes} white />
        <StatCard label="Calories" value={totalCalories} white />
      </div>

      {/* Tabs */}
      <div className="mt-8 flex items-center justify-between gap-4">
        {/* Tabs wrapper */}
        <div className="inline-flex items-center gap-1 rounded-lg border border-neutral-800 bg-neutral-900/60 p-1">
          <TabButton
            active={tab === "plan"}
            onClick={() => setTab("plan")}
            label="Today's Plan"
          />
          <TabButton
            active={tab === "saved"}
            onClick={() => setTab("saved")}
            label="Saved"
          />
        </div>

        {/* Sort dropdown (optional — keep if you have it) */}
      </div>

      {/* Content */}
      {list.length === 0 ? (
        <EmptyState tab={tab} />
      ) : (
        <div className="mt-6 space-y-3">
          {list.map((w) => {
            const done = doneIds.includes(w.id);
            return (
              <div
                key={w.id}
                className="flex flex-col gap-4 rounded-xl border border-neutral-800 bg-neutral-900 p-4 transition hover:border-neutral-700 sm:flex-row sm:items-center"
              >
                {/* Thumbnail */}
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-neutral-800">
                  <Image
                    src={w.image}
                    alt={w.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <h3
                    className={`font-oswald text-lg font-bold uppercase tracking-wide ${done ? "text-neutral-500 line-through" : ""
                      }`}
                  >
                    {w.name}
                  </h3>
                  <p className="text-xs text-neutral-500">{w.equipment}</p>
                  <div className="mt-1 flex flex-wrap gap-3 text-xs text-neutral-400">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {w.duration} min
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame className="h-3 w-3" /> {w.caloriesBurned} kcal
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3" /> {w.rating}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={`/workout/${w.id}`}
                    className="flex items-center gap-1 rounded-full border border-neutral-700 px-3 py-1.5 text-xs font-bold uppercase text-neutral-300 transition hover:border-lime-400 hover:text-lime-400"
                  >
                    <Eye className="h-3 w-3" /> View Details
                  </Link>

                  {tab === "plan" && (
                    <button
                      onClick={() => {
                        markDone(w.id);
                        toast.success(
                          done ? "Marked as undone" : "Marked as done"
                        );
                      }}
                      className="flex items-center gap-1 rounded-full bg-lime-400 px-3 py-1.5 text-xs font-bold uppercase text-black transition hover:bg-lime-300"
                    >
                      <Check className="h-3 w-3" /> Mark as Done
                    </button>
                  )}

                  <button
                    onClick={() => {
                      if (tab === "plan") {
                        removeFromPlan(w.id);
                        toast.success("Removed from plan");
                      } else {
                        removeSaved(w.id);
                        toast.success("Removed from saved");
                      }
                    }}
                    aria-label="Remove"
                    className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 transition hover:bg-red-500/10 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ---------- Sub-components ---------- */

function TabButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-md px-4 py-1.5 text-xs font-semibold transition ${active
          ? "bg-neutral-800 text-white"
          : "text-neutral-400 hover:text-neutral-200"
        }`}
    >
      {label}
    </button>
  );
}

function StatCard({
  label,
  value,
  white,
}: {
  label: string;
  value: number;
  white?: boolean;
}) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-5 text-center">
      <p className="text-xs font-medium text-neutral-400 sm:text-sm">
        {label}
      </p>
      <p
        className={`mt-1 font-oswald text-3xl font-bold sm:text-4xl ${white ? "text-white" : "text-brand"
          }`}
      >
        {value}
      </p>
    </div>
  );
}

function EmptyState({ tab }: { tab: "plan" | "saved" }) {
  return (
    <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-800 py-20 text-center">
      <h3 className="font-oswald text-2xl font-bold uppercase tracking-wide">
        Nothing here yet
      </h3>
      <p className="mt-2 max-w-md text-sm text-neutral-500">
        {tab === "plan"
          ? "Browse the library and add a lift to get today moving."
          : "Save lifts you love and they'll show up here."}
      </p>
      <Link
        href="/#library"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-lime-400 px-6 py-3 text-sm font-bold uppercase text-black transition hover:bg-lime-300"
      >
        Go to workouts
      </Link>
    </div>
  );
}