"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { Bookmark, Calendar, Clock, Flame, Star } from "lucide-react";
import { useWorkout, Workout } from "@/app/context/WorkoutContext";

export default function DetailsClient({ workout }: { workout: Workout }) {
  const { addToPlan, toggleSaved, myPlan, saved } = useWorkout();
  const inPlan = myPlan.find((w) => w.id === workout.id);
  const isSaved = saved.find((w) => w.id === workout.id);

  const handleAddPlan = () => {
    if (inPlan) {
      toast.error("Already in your plan");
      return;
    }
    if (myPlan.length >= 5) {
      toast.error("Plan is full (max 5 lifts)");
      return;
    }
    addToPlan(workout);
    toast.success("Added to today\u2019s plan");
  };

  const handleSave = () => {
    toggleSaved(workout);
    toast.success(isSaved ? "Removed from saved" : "Saved for later");
  };

  return (
    <div className="container mx-auto grid gap-8 px-4 py-10 lg:grid-cols-2">
      {/* Left: Image */}
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Right: Content */}
      <div>
        <h1 className="font-oswald text-3xl font-bold uppercase tracking-wide sm:text-4xl">
          {workout.name}
        </h1>
        <p className="mt-3 text-neutral-400">{workout.description}</p>

        {/* Category pills */}
        <div className="mt-4 flex flex-wrap gap-1">
          {workout.muscleGroups?.map((c) => (
            <span
              key={c}
              className="rounded-full bg-brand px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black"
            >
              {c}
            </span>
          ))}
        </div>

        {/* Specs table */}
        <div className="mt-6 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900">
          <SpecRow label="Equipment" value={workout.equipment} />
          <SpecRow label="Difficulty" value={workout.difficulty} />
          <SpecRow label="Sets" value={workout.sets} />
          <SpecRow label="Reps" value={workout.reps} />
          <SpecRow label="Duration" value={`${workout.duration} min`} />
          <SpecRow label="Calories" value={`${workout.caloriesBurned} kcal`} />
          <SpecRow label="Rating" value={workout.rating} last />
        </div>

        {/* Instructions */}
        <h3 className="mt-8 font-oswald text-lg font-bold uppercase tracking-wider text-white">
          Instructions
        </h3>
        <ol className="mt-3 space-y-2">
          {workout.instructions?.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm text-neutral-300">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-neutral-600 text-xs font-semibold text-neutral-300">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={handleAddPlan}
            disabled={!!inPlan}
            className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            style={{ backgroundColor: "#C2F800" }}
          >
            <Calendar className="h-4 w-4" />
            {inPlan ? "In your plan" : "Add to today's plan"}
          </button>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-700 px-5 py-2.5 text-sm font-medium text-neutral-100 transition hover:border-neutral-500"
          >
            <Bookmark className="h-4 w-4" />
            {isSaved ? "Saved" : "Save for later"}
          </button>
        </div>
      </div>
    </div>
  );
}

function SpecRow({
  label,
  value,
  last,
}: {
  label: string;
  value: string | number;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between px-4 py-3 text-sm ${!last ? "border-b border-neutral-800" : ""
        }`}
    >
      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
        {label}
      </span>
      <span className="font-medium text-neutral-100">{value}</span>
    </div>
  );
}