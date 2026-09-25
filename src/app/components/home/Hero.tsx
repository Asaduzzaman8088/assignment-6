import Image from "next/image";

export default function Hero() {
  return (
    <section className="container mx-auto px-4 py-6 sm:py-10">
      <div className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/60 px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-4">
          {/* Left: Text */}
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-brand">
              Workout Library
            </p>
            <h1 className="font-oswald text-4xl font-bold uppercase leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[56px]">
              Train with intent. Log every set.
            </h1>
            <p className="mt-5 max-w-md text-sm text-neutral-400 sm:text-base">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today's plan, and watch the week's work add up.
            </p>

            {/* Button — hard-coded hex to avoid any theme issue */}
            <a
              href="#library"
              className="mt-7 inline-flex items-center gap-2 rounded-md px-6 py-3 text-xs font-bold uppercase tracking-wider text-black transition hover:brightness-110 sm:text-sm"
              style={{ backgroundColor: "#C2F800" }}
            >
              Browse Workouts
              <span className="text-base leading-none">↓</span>
            </a>
          </div>

          {/* Right: Image */}
          <div className="relative flex justify-end">
            <div className="relative h-60 w-60 sm:h-72 sm:w-72 lg:h-80 lg:w-80">
              <Image
                src="/banner-1.svg"
                alt="Workout"
                fill
                className="object-contain object-right"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}