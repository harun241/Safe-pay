// ✅ File: src/app/plans/success/page.js
"use client";

import { Suspense } from "react";
import SuccessContent from "./SuccessContent";

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="text-center py-24">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
