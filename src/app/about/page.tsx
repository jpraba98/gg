import type { Metadata } from "next";

import { Bio } from "@/components/sections/about/bio";
import { ProofStats } from "@/components/sections/about/proof-stats";
import { TrackRecord } from "@/components/sections/about/track-record";
import { Mission } from "@/components/sections/about/mission";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet the founder behind The Drip Room — Toronto's creative engine spanning talent management, media production, and event production.",
};

export default function AboutPage() {
  return (
    <>
      <Bio />
      <ProofStats />
      <TrackRecord />
      <Mission />
    </>
  );
}
