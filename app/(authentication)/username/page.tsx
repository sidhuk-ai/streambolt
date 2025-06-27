"use client";

import { useRouter } from "next/navigation";
import UsernameSelector from "@/components/username-selector";
import Loading from "./loading";
import { Suspense } from "react";

export default function UsernameSelectionPage() {
  const router = useRouter();

  const handleContinue = () => {
    router.push("/login");
  };

  return (
    <Suspense fallback={<Loading />}>
    <UsernameSelector
      onContinue={handleContinue}
      title="Choose Your Username"
      subtitle="Pick a unique username that represents you on StreamBolt"
      />
    </Suspense>
  );
}
