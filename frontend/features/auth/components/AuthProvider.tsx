"use client";

import { useEffect } from "react";
import { useAuthStore } from "../store/auth.store";
import type { User } from "../types/auth.types";

interface AuthProviderProps {
  user: User | null;
  children: React.ReactNode;
}

export function AuthProvider({
  user,
  children,
}: AuthProviderProps) {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return <>{children}</>;
}