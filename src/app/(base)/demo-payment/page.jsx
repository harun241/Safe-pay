import { Suspense } from "react";
import DemoPaymentPage from "./DemoPaymentPage";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Payment Page...</div>}>
      <DemoPaymentPage />
    </Suspense>
  );
}
