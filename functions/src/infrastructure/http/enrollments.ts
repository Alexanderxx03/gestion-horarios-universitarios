import { HttpsError, onCall } from 'firebase-functions/v2/https';
import { z } from 'zod';
import { DomainError } from '../../domain/errors';
import { CreateEnrollmentSchema } from '../../shared/schemas/enrollment';
import { requireRole } from '../../shared/authz';
import { logger } from '../../shared/logger';

/**
 * Thin onCall handler. Parses input, authorises the caller, then delegates to
 * a use case. The use case is not wired yet — the placeholder below will be
 * replaced once Firestore adapters are ready.
 */
export const createEnrollment = onCall({ region: 'us-central1' }, async (request) => {
  const auth = requireRole(request, ['STUDENT']);

  const parsed = CreateEnrollmentSchema.safeParse(request.data);
  if (!parsed.success) {
    throw new HttpsError('invalid-argument', 'Payload inválido.', parsed.error.flatten());
  }

  try {
    // TODO: instantiate adapters and call `validateEnrollment`.
    logger.info('createEnrollment received', {
      uid: auth.uid,
      periodId: parsed.data.periodId,
      courseCount: parsed.data.selectedCourses.length,
    });
    return { ok: true, pending: true };
  } catch (error) {
    if (error instanceof DomainError) {
      throw new HttpsError('failed-precondition', error.message, { code: error.code });
    }
    if (error instanceof z.ZodError) {
      throw new HttpsError('invalid-argument', 'Payload inválido.', error.flatten());
    }
    logger.error('createEnrollment unexpected error', {
      message: error instanceof Error ? error.message : String(error),
    });
    throw new HttpsError('internal', 'Error interno. Intenta de nuevo.');
  }
});
