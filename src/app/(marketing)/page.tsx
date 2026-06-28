
import { HomeClient } from "@/components/HomeClient";
import { CursorGlow } from "@/components/CursorGlow";

// This opts Next.js out of static caching for this route so uploaded images show immediately.
export const dynamic = "force-dynamic";

export default async function Home() {
  const safeMemories: any[] = [];

  return (
    <main className="min-h-screen relative flex flex-col items-center justify-start bg-pure-black">
      <div className="noise-overlay" />
      <CursorGlow />
      <HomeClient initialMemories={safeMemories} />
    </main>
  );
}
