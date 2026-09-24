import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/shared/Navbar";
import Footer from "@/app/components/shared/Footer";
import { WorkoutProvider } from "@/app/context/WorkoutContext";
import { Toaster } from "react-hot-toast";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description: "Train with intent. Log every set.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100 font-inter antialiased">
        <WorkoutProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#171717",
                color: "#fafafa",
                border: "1px solid #262626",
              },
            }}
          />
        </WorkoutProvider>
      </body>
    </html>
  );
}