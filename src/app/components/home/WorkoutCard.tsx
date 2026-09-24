import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star } from "lucide-react";
import { Workout } from "@/app/context/WorkoutContext";

// Helper: works whether the field is a string or an array
function toText(value: any): string {
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "string") return value;
  return "";
}

function toArray(value: any): string[] {
  if (Array.isArray(value)) return value;
  if (typeof value === "string")
    return value.split(",").map((s) => s.trim()).filter(Boolean);
  return [];
}

export default function WorkoutCard({ workout }: { workout: Workout }) {
  const categories = toArray(workout.category);
  const equipmentText = toText(workout.equipment);

  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 transition hover:-translate-y-1 hover:border-lime-400/50"
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-neutral-800">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category pills */}
        {categories.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1">
            {categories.map((c) => (
              <span
                key={c}
                className="rounded-full bg-lime-400/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-lime-400"
              >
                {c}
              </span>
            ))}
          </div>
        )}

        {/* Name */}
        <h3 className="font-oswald text-lg font-bold uppercase tracking-wide">
          {workout.name}
        </h3>

        {/* Equipment */}
        {equipmentText && (
          <p className="mt-1 text-xs text-neutral-500">{equipmentText}</p>
        )}

        {/* Stats */}
        <div className="mt-3 flex items-center gap-3 border-t border-neutral-800 pt-3 text-xs text-neutral-400">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame className="h-3.5 w-3.5" /> {workout.calories} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5" /> {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}