// features/auth/hooks/usePasswordToggle.ts

'use client';

import { useState, useCallback } from 'react';

export function usePasswordToggle(): [boolean, () => void] {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return [showPassword, togglePassword];
}