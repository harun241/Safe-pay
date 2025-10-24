import { Suspense } from "react";
import SuccessContent from "./SuccessContent";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Payment Page...</div>}>
        <SuccessContent />
    </Suspense>
  );
}
