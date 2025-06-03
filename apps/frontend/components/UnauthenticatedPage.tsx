import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

      <h1 className="text-2xl font-semibold font-serif mb-2">
        Oops! You&rsquo;re not signed in yet
      </h1>
      <p className="text-muted-foreground font-serif mb-6">
        You&rsquo;re just one click away. Sign up to continue.
      </p>

      <Button asChild className="group transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-primary/90 hover:shadow-lg">
        <Link href="/register">
          Sign up
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </Button>
    </main>
  );
};

export default UnauthenticatedPage;
