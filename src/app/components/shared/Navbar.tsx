"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell } from "lucide-react";
import { useWorkout } from "@/app/context/WorkoutContext";

export default function Navbar() {
  const pathname = usePathname();
  const { myPlan, saved } = useWorkout();

  const linkClass = (href: string) =>
    `px-3 py-1.5 rounded-md text-sm font-medium transition ${pathname === href
      ? "bg-lime-400/10 text-lime-400"
      : "text-neutral-400 hover:text-white"
    }`;

  return (
    <nav className="sticky top-0 z-40 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Dumbbell className="h-5 w-5 text-lime-400" />
          <span className="font-oswald text-xl font-bold tracking-wider">
            FITLOG
          </span>
        </Link>

        {/* Links (center) */}
        <div className="hidden gap-1 sm:flex">
          <Link href="/" className={linkClass("/")}>
            Workouts
          </Link>
          <Link href="/my-plan" className={linkClass("/my-plan")}>
            My Plan
          </Link>
        </div>

        {/* Badges (right) */}
        <div className="flex items-center gap-2">
          {/* Plan badge */}
          <Link
            href="/my-plan"
            className="flex items-center gap-2 rounded-full py-1 pl-4 pr-1 text-xs font-bold text-neutral-100 transition hover:bg-gray-800"
          >
            Plan
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lime-400 text-xs font-bold text-black">
              {myPlan.length}
            </span>
          </Link>

          {/* Saved badge */}
          <Link
            href="/my-plan"
            className="flex items-center gap-2 rounded-full py-1 pl-4 pr-1 text-xs font-bold text-neutral-100 transition hover:bg-gray-800"
          >
            Saved
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-neutral-600 text-xs font-bold text-neutral-100">
              {saved.length}
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile links (bottom of navbar) */}
      <div className="flex justify-center gap-2 border-t border-neutral-800 px-4 py-2 sm:hidden">
        <Link href="/" className={linkClass("/")}>
          Workouts
        </Link>
        <Link href="/my-plan" className={linkClass("/my-plan")}>
          My Plan
        </Link>
      </div>
    </nav>
  );
}