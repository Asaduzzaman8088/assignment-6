"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { Clock, Flame, Star, X, Check, Eye } from "lucide-react";
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

  const totalExercises = myPlan.length;
  const totalMinutes = myPlan.reduce((sum, w) => sum + (w.duration || 0), 0);
  const totalCalories = myPlan.reduce(
    (sum, w) => sum + (w.caloriesBurned || 0),
    0
  );

  return (
    <div className="container mx-auto px-4 py-8 sm:py-10">
      {/* Header */}
      <h1 className="font-oswald text-3xl font-bold uppercase tracking-tight sm:text-4xl">
        My Plan
      </h1>
      <p className="mt-1 text-sm text-neutral-400">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      {/* Metrics */}
      <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-4">
        <StatCard label="Exercises" value={totalExercises} />
        <StatCard label="Minutes" value={totalMinutes} white />
        <StatCard label="Calories" value={totalCalories} white />
      </div>

      {/* Tabs — FIXED WIDTH so no shifting */}
      <div className="mt-8 flex">
        <div className="flex w-full items-center gap-1 rounded-lg border border-neutral-800 bg-neutral-900/60 p-1 sm:w-fit">
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
      </div>

      {/* Content — fixed min-height so page height doesn't jump */}
      <div className="mt-6 ">
        {list.length === 0 ? (
          <EmptyState tab={tab} />
        ) : (
          <div className="space-y-3">
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
                      className={`truncate font-oswald text-base font-bold uppercase tracking-wide sm:text-lg ${done ? "text-neutral-500 line-through" : ""
                        }`}
                    >
                      {w.name}
                    </h3>
                    <p className="truncate text-xs text-neutral-500">
                      {w.equipment}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-neutral-400">
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-neutral-500" strokeWidth={1.8} />
                        {w.duration} min
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Flame className="h-3.5 w-3.5 text-neutral-500" strokeWidth={1.8} />
                        {w.caloriesBurned} kcal
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Star className="h-3.5 w-3.5 text-neutral-500" strokeWidth={1.8} />
                        {w.rating}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
                    <Link
                      href={`/workout/${w.id}`}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-neutral-700 bg-transparent px-4 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-300 transition hover:border-neutral-500 hover:text-white sm:flex-none"
                    >
                      View Details
                    </Link>

                    {tab === "plan" && (
                      <button
                        onClick={() => {
                          markDone(w.id);
                          toast.success(done ? "Marked as undone" : "Marked as done");
                        }}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand px-4 py-2 text-xs font-bold uppercase tracking-wide text-black transition hover:brightness-110 sm:flex-none"
                      >
                        <Check className="h-4 w-4" strokeWidth={3} />
                        Mark as Done
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
                      className="inline-flex h-8 w-8 shrink-0 items-center justify-center text-neutral-500 transition hover:text-red-400"
                    >
                      <X className="h-4 w-4" strokeWidth={2} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
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
      className={`flex-1 whitespace-nowrap rounded-md px-4 py-1.5 text-center text-xs font-semibold transition sm:flex-none ${active
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
    <div className="rounded-xl border border-neutral-800 bg-neutral-900 px-2 py-4 text-center sm:px-4 sm:py-5">
      <p className="text-[11px] font-medium text-neutral-400 sm:text-sm">
        {label}
      </p>
      <p
        className={`mt-1 font-oswald text-2xl font-bold sm:text-4xl ${white ? "text-white" : "text-brand"
          }`}
      >
        {value}
      </p>
    </div>
  );
}

function EmptyState({ tab }: { tab: "plan" | "saved" }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-800 px-4 py-16 text-center sm:py-20">
      <h3 className="font-oswald text-xl font-bold uppercase tracking-wide sm:text-2xl">
        Nothing here yet
      </h3>
      <p className="mt-2 max-w-md text-sm text-neutral-500">
        {tab === "plan"
          ? "Browse the library and add a lift to get today moving."
          : "Save lifts you love and they'll show up here."}
      </p>
      <Link
        href="/#library"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-xs font-bold uppercase text-black transition hover:brightness-110 sm:text-sm"
      >
        Go to workouts
      </Link>
    </div>
  );
}