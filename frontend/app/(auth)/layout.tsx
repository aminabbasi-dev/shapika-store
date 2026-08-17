// app/(auth)/layout.tsx

import { ReactNode } from 'react';
import { Toaster } from 'sonner';

export default function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-stone-50">
      {children}
<Toaster 
  position="top-center"
/>
    </div>
  );
}