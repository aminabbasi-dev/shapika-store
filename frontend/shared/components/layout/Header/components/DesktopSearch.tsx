"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export default function DesktopSearch() {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) console.log("جستجو دسکتاپ:", query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md">
      <Input
        type="search"
        placeholder="جستجو در محصولات..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 min-w-0"
      />
      <Button
        className="cursor-pointer hover:scale-120"
        type="submit"
        size="icon"
        aria-label="جستجو"
      >
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );
}
