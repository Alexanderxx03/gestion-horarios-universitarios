import { HttpsError, type CallableRequest } from 'firebase-functions/v2/https';

export type UserRole = 'ADMIN' | 'COORDINATOR' | 'TEACHER' | 'STUDENT';

const VALID_ROLES: readonly UserRole[] = ['ADMIN', 'COORDINATOR', 'TEACHER', 'STUDENT'];

export interface AuthContext {
  uid: string;
  role: UserRole;
  email: string | null;
}

function isUserRole(value: unknown): value is UserRole {
  return typeof value === 'string' && (VALID_ROLES as readonly string[]).includes(value);
}

/**
 * Validate that the caller is authenticated and has one of the allowed roles.
 * Throws HttpsError on failure so Firebase Functions returns a proper error to
 * the client.
 */
export function requireRole(
  request: CallableRequest<unknown>,
  allowed: readonly UserRole[],
): AuthContext {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Debes iniciar sesión.');
  }

  const token = request.auth.token as Record<string, unknown>;
  const role = token.role;
  if (!isUserRole(role) || !allowed.includes(role)) {
    throw new HttpsError('permission-denied', 'No tienes permisos para esta acción.');
  }

  return {
    uid: request.auth.uid,
    role,
    email: typeof token.email === 'string' ? token.email : null,
  };
}
