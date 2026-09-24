import DetailsClient from "@/app/components/workout/DetailsClient";
import { Workout } from "@/app/context/WorkoutContext";

async function getWorkout(id: string): Promise<Workout | null> {
  try {
    const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data ?? data;
  } catch {
    return null;
  }
}

export default async function WorkoutDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workout = await getWorkout(id);

  if (!workout) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="font-oswald text-3xl font-bold uppercase">
          Workout not found
        </h1>
        <p className="mt-2 text-neutral-500">
          The workout you&apos;re looking for doesn&apos;t exist.
        </p>
      </div>
    );
  }

  return <DetailsClient workout={workout} />;
}