export interface CallableError {
  code: string;
  message: string;
}

export function toCallableError(error: unknown): CallableError {
  if (typeof error === 'object' && error !== null && 'code' in error && 'message' in error) {
    const typed = error as { code: unknown; message: unknown };
    return {
      code: typeof typed.code === 'string' ? typed.code : 'unknown',
      message: typeof typed.message === 'string' ? typed.message : 'Error desconocido',
    };
  }
  return { code: 'unknown', message: 'Error desconocido' };
}
