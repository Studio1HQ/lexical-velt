"use client";

import { useAppUser } from "@/app/userAuth/useAppUser";
import type { VeltAuthProvider } from "@veltdev/types";
import { useMemo, useCallback } from "react";

// [Velt] User authentication hook
export function useVeltAuthProvider() {
  const { user } = useAppUser();

  const generateToken = useCallback(async (): Promise<string> => {
    if (!user) return "";
    const response = await fetch('/api/velt/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user.userId,
        organizationId: user.organizationId,
        email: user.email,
      }),
    });
    if (!response.ok) throw new Error('Token fetch failed');
    const data = await response.json();
    return data.token;
  }, [user]);

  const authProvider: VeltAuthProvider | undefined = useMemo(() => {
    if (!user?.userId) return undefined;
    return {
      user: {
        userId: user.userId,
        name: user.name,
        email: user.email,
        photoUrl: user.photoUrl,
        organizationId: user.organizationId,
      },
      generateToken,
      retryConfig: { retryCount: 3, retryDelay: 1000 },
    };
  }, [user, generateToken]);

  return { authProvider };
}
