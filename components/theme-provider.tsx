"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [mounted, setMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return (
    <div className="bg-background">
      <GlobalLoading />
    </div>
  );
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export const GlobalLoading = () => {
  return (
    <div className="h-dvh w-full flex items-center justify-center">
      Loading...
    </div>
  )
}