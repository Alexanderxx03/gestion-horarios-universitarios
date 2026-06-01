/**
 * Mapea un error a un formato estándar de error de llamada.
 * Útil para pruebas y consistencia de manejo de errores en el cliente.
 */
export function toCallableError(error: unknown): { code: string; message: string } {
  if (error && typeof error === 'object') {
    const err = error as Record<string, unknown>;
    if (typeof err.code === 'string' && typeof err.message === 'string') {
      return { code: err.code, message: err.message };
    }
  }
  return { code: 'unknown', message: 'Error desconocido' };
}
