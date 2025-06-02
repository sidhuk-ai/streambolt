import { Button } from "@/components/ui/button";
import Image from "next/image";

const UnauthenticatedPage = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 text-center bg-background text-foreground">
      <Image
        src="/un_authenticated.png"
        alt="Unauthenticated illustration"
        width={300}
        height={300}
        priority
        className="mb-6"
      />

      <h1 className="text-2xl font-semibold mb-2">You're unauthenticated</h1>
      <p className="text-muted-foreground mb-6">
        Please sign up to access this page.
      </p>

      <Button asChild>
        <a href="/register">Sign up</a>
      </Button>
    </main>
  );
};

export default UnauthenticatedPage;
