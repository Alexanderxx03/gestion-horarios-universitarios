import { afterAll, beforeAll, beforeEach, describe, it } from 'vitest';
import {
  assertFails,
  assertSucceeds,
  type RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { setupTestEnv } from './helpers';

let env: RulesTestEnvironment;

beforeAll(async () => {
  env = await setupTestEnv();
});

afterAll(async () => {
  await env?.cleanup();
});

beforeEach(async () => {
  await env.clearFirestore();
  await env.withSecurityRulesDisabled(async (ctx) => {
    await setDoc(doc(ctx.firestore(), 'schedules/s1'), {
      periodId: 'p-1',
      status: 'GENERATED',
      assignments: [],
    });
  });
});

describe('schedules rules', () => {
  it('lets any authenticated user read schedules', async () => {
    const student = env.authenticatedContext('alice', { role: 'STUDENT' });
    await assertSucceeds(getDoc(doc(student.firestore(), 'schedules/s1')));
  });

  it('forbids any client-side write to schedules — even admins', async () => {
    const admin = env.authenticatedContext('admin', { role: 'ADMIN' });
    await assertFails(
      setDoc(doc(admin.firestore(), 'schedules/s2'), { periodId: 'p-1', status: 'DRAFT' }),
    );
  });
});
