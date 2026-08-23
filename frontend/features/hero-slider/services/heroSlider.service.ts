import { Slide } from "../types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getHeroSlides(): Promise<Slide[]> {
  const response = await fetch(`${API_URL}/hero-slides`, {
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch hero slides");
  }

  return response.json();
}