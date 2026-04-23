import { useEffect, useState } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export type UserRole = 'ADMIN' | 'COORDINATOR' | 'TEACHER' | 'STUDENT';

export interface AuthState {
  user: User | null;
  role: UserRole | null;
  loading: boolean;
}

const VALID_ROLES: readonly UserRole[] = ['ADMIN', 'COORDINATOR', 'TEACHER', 'STUDENT'];

function isValidRole(value: unknown): value is UserRole {
  return typeof value === 'string' && (VALID_ROLES as readonly string[]).includes(value);
}

export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({ user: null, role: null, loading: true });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setState({ user: null, role: null, loading: false });
        return;
      }
      const token = await user.getIdTokenResult();
      const role = isValidRole(token.claims.role) ? token.claims.role : null;
      setState({ user, role, loading: false });
    });
    return unsub;
  }, []);

  return state;
}
