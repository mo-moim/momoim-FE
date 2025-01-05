import { Suspense } from "react";
import GatheringEditContent from "./GatheringEdit";

export default function GatheringEdit() {
  return (
    <Suspense>
      <GatheringEditContent />
    </Suspense>
  );
}
