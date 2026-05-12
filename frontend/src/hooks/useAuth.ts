import { useEffect, useState } from 'react';

export type UserRole = 'ADMIN' | 'COORDINATOR' | 'TEACHER' | 'STUDENT';

export interface User {
  uid: string;
  email: string;
  role?: UserRole;
}

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
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setState({ user: null, role: null, loading: false });
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const role = isValidRole(data.user.role) ? data.user.role : null;
          setState({ user: data.user, role, loading: false });
        } else {
          localStorage.removeItem('token');
          setState({ user: null, role: null, loading: false });
        }
      } catch (error) {
        console.error('Error fetching auth data:', error);
        setState({ user: null, role: null, loading: false });
      }
    };

    checkAuth();
  }, []);

  return state;
}
