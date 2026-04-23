import { httpsCallable, type HttpsCallable } from 'firebase/functions';
import { functions } from './firebase';

/**
 * Typed wrapper around `httpsCallable`. Centralising the call site makes it
 * trivial to add tracing, error mapping, retries, etc. later.
 */
export function callable<TRequest, TResponse>(name: string): HttpsCallable<TRequest, TResponse> {
  return httpsCallable<TRequest, TResponse>(functions, name);
}

export { toCallableError, type CallableError } from './callableError';
