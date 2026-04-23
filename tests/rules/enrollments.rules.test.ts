import { afterAll, beforeAll, beforeEach, describe, it } from 'vitest';
import {
  assertFails,
  assertSucceeds,
  type RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';
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
    const db = ctx.firestore();
    await setDoc(doc(db, 'enrollments/e1'), {
      studentId: 'alice',
      periodId: 'p-1',
      status: 'PENDING',
      totalCredits: 8,
      selectedCourses: [{ courseId: 'c1', courseName: 'X', credits: 4 }],
    });
  });
});

describe('enrollments rules', () => {
  it('allows a student to create their own PENDING enrollment', async () => {
    const alice = env.authenticatedContext('alice', { role: 'STUDENT' });
    await assertSucceeds(
      addDoc(collection(alice.firestore(), 'enrollments'), {
        studentId: 'alice',
        periodId: 'p-1',
        status: 'PENDING',
        totalCredits: 8,
        selectedCourses: [{ courseId: 'c1', courseName: 'X', credits: 4 }],
      }),
    );
  });

  it('forbids a student from enrolling as another user', async () => {
    const alice = env.authenticatedContext('alice', { role: 'STUDENT' });
    await assertFails(
      addDoc(collection(alice.firestore(), 'enrollments'), {
        studentId: 'bob',
        periodId: 'p-1',
        status: 'PENDING',
        totalCredits: 8,
        selectedCourses: [{ courseId: 'c1', courseName: 'X', credits: 4 }],
      }),
    );
  });

  it('forbids a student from creating an enrollment with an invalid status', async () => {
    const alice = env.authenticatedContext('alice', { role: 'STUDENT' });
    await assertFails(
      addDoc(collection(alice.firestore(), 'enrollments'), {
        studentId: 'alice',
        periodId: 'p-1',
        status: 'VALIDATED',
        totalCredits: 8,
        selectedCourses: [{ courseId: 'c1', courseName: 'X', credits: 4 }],
      }),
    );
  });

  it('forbids a student from creating with an absurd credit total', async () => {
    const alice = env.authenticatedContext('alice', { role: 'STUDENT' });
    await assertFails(
      addDoc(collection(alice.firestore(), 'enrollments'), {
        studentId: 'alice',
        periodId: 'p-1',
        status: 'PENDING',
        totalCredits: 999,
        selectedCourses: [{ courseId: 'c1', courseName: 'X', credits: 4 }],
      }),
    );
  });

  it('lets a student read their own enrollment', async () => {
    const alice = env.authenticatedContext('alice', { role: 'STUDENT' });
    await assertSucceeds(getDoc(doc(alice.firestore(), 'enrollments/e1')));
  });

  it('forbids a student from reading another student enrollment', async () => {
    const bob = env.authenticatedContext('bob', { role: 'STUDENT' });
    await assertFails(getDoc(doc(bob.firestore(), 'enrollments/e1')));
  });

  it('lets a coordinator read any enrollment', async () => {
    const coord = env.authenticatedContext('coord', { role: 'COORDINATOR' });
    await assertSucceeds(getDoc(doc(coord.firestore(), 'enrollments/e1')));
  });
});
