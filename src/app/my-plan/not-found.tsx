import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 py-20 text-center">
      <h1 className="font-oswald text-7xl font-bold text-lime-400 sm:text-8xl">
        404
      </h1>
      <h2 className="mt-4 font-oswald text-2xl font-bold uppercase tracking-wide sm:text-3xl">
        Page not found
      </h2>
      <p className="mt-2 max-w-md text-sm text-neutral-400">
        The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you
        back to the gym.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-lime-400 px-6 py-3 text-sm font-bold uppercase text-black transition hover:bg-lime-300"
      >
        <Home className="h-4 w-4" />
        Back to Home
      </Link>
    </div>
  );
}