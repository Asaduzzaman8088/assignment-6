import Image from "next/image";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="container mx-auto grid gap-8 px-4 py-12 lg:grid-cols-2 lg:items-center lg:py-20">
      {/* Left: Text */}
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-lime-400">
          Workout Library
        </p>
        <h1 className="font-oswald text-4xl font-bold uppercase leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          Train with intent. Log every set.
        </h1>
        <p className="mt-4 max-w-lg text-neutral-400">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into
          today&apos;s plan, and watch the week&apos;s work add up.
        </p>
        <a
          href="#library"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-lime-400 px-6 py-3 text-sm font-bold uppercase text-black transition hover:bg-lime-300"
        >
          Browse Workouts
          <ArrowDown className="h-4 w-4" />
        </a>
      </div>

      {/* Right: Image */}
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900">
        <Image
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80"
          alt="Workout"
          fill
          className="object-cover"
          priority
        />
      </div>
    </section>
  );
}