import { describe, expect, it } from 'vitest';
import { toCallableError } from '@/lib/callableError';

describe('toCallableError', () => {
  it('maps a Firebase-like error object', () => {
    const error = { code: 'permission-denied', message: 'Sin permiso' };
    expect(toCallableError(error)).toEqual(error);
  });

  it('falls back to unknown for non-object errors', () => {
    expect(toCallableError('boom')).toEqual({ code: 'unknown', message: 'Error desconocido' });
    expect(toCallableError(null)).toEqual({ code: 'unknown', message: 'Error desconocido' });
    expect(toCallableError(undefined)).toEqual({ code: 'unknown', message: 'Error desconocido' });
  });

  it('falls back when fields have the wrong type', () => {
    expect(toCallableError({ code: 1, message: true })).toEqual({
      code: 'unknown',
      message: 'Error desconocido',
    });
  });
});
