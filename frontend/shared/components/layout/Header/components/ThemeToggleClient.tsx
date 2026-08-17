"use client";

import dynamic from "next/dynamic";

const ThemeToggle = dynamic(
  () =>
    import("./ThemeToggle").then(
      (module) => module.ThemeToggle,
    ),
  {
    ssr: false,
  },
);

export function ThemeToggleClient() {
  return <ThemeToggle />;
}