"use client";

import { useRouter } from "next/navigation";
import UsernameSelector from "@/components/username-selector";

export default function UsernameSelectionPage() {
  const router = useRouter();

  const handleContinue = () => {
    router.push("/login");
  };

  return (
    <UsernameSelector
      onContinue={handleContinue}
      title="Choose Your Username"
      subtitle="Pick a unique username that represents you on StreamBolt"
    />
  );
}
