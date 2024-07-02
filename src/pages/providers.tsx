'use client';

import { AuthProvider } from '';

export function Providers({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
