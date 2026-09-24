import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 mt-auto">
      <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 py-6 sm:flex-row">
        <div className="flex items-center gap-2">
          <Dumbbell className="h-5 w-5 text-lime-400" />
          <span className="font-oswald text-lg font-bold tracking-wider">
            FITLOG
          </span>
        </div>
        <p className="text-xs text-neutral-500">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}