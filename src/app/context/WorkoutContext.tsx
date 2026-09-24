"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  duration: number;
  caloriesBurned: number;
  rating: number;
  difficulty: string;
  sets: number;
  reps: string;
  description: string;
  instructions: string[];
};

type ContextType = {
  myPlan: Workout[];
  saved: Workout[];
  doneIds: number[];
  addToPlan: (w: Workout) => void;
  removeFromPlan: (id: number) => void;
  toggleSaved: (w: Workout) => void;
  removeSaved: (id: number) => void;
  markDone: (id: number) => void;
};

const WorkoutContext = createContext<ContextType | null>(null);

export function WorkoutProvider({ children }: { children: ReactNode }) {
  const [myPlan, setMyPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [doneIds, setDoneIds] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage on first mount
  useEffect(() => {
    try {
      const p = localStorage.getItem("fitlog_myPlan");
      const s = localStorage.getItem("fitlog_saved");
      const d = localStorage.getItem("fitlog_doneIds");
      if (p) setMyPlan(JSON.parse(p));
      if (s) setSaved(JSON.parse(s));
      if (d) setDoneIds(JSON.parse(d));
    } catch (err) {
      console.error("Failed to load localStorage:", err);
    }
    setHydrated(true);
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (hydrated) localStorage.setItem("fitlog_myPlan", JSON.stringify(myPlan));
  }, [myPlan, hydrated]);

  useEffect(() => {
    if (hydrated) localStorage.setItem("fitlog_saved", JSON.stringify(saved));
  }, [saved, hydrated]);

  useEffect(() => {
    if (hydrated)
      localStorage.setItem("fitlog_doneIds", JSON.stringify(doneIds));
  }, [doneIds, hydrated]);

  const addToPlan = (w: Workout) => {
    if (myPlan.length >= 5) return;
    if (myPlan.find((x) => x.id === w.id)) return;
    setMyPlan((prev) => [...prev, w]);
  };

  const removeFromPlan = (id: number) => {
    setMyPlan((prev) => prev.filter((x) => x.id !== id));
    setDoneIds((prev) => prev.filter((x) => x !== id));
  };

  const toggleSaved = (w: Workout) => {
    setSaved((prev) =>
      prev.find((x) => x.id === w.id)
        ? prev.filter((x) => x.id !== w.id)
        : [...prev, w]
    );
  };

  const removeSaved = (id: number) => {
    setSaved((prev) => prev.filter((x) => x.id !== id));
  };

  const markDone = (id: number) => {
    setDoneIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <WorkoutContext.Provider
      value={{
        myPlan,
        saved,
        doneIds,
        addToPlan,
        removeFromPlan,
        toggleSaved,
        removeSaved,
        markDone,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  const ctx = useContext(WorkoutContext);
  if (!ctx) throw new Error("useWorkout must be used inside WorkoutProvider");
  return ctx;
}