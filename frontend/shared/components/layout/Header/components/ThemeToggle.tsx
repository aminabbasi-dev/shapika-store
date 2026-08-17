"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() =>
        setTheme(resolvedTheme === "light" ? "dark" : "light")
      }
      className="hover:text-primary cursor-pointer scale-150 hover:scale-160"
      aria-label="تغییر تم"
    >
      {resolvedTheme === "light" ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </Button>
  );
}