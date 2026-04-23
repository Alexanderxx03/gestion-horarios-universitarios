import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import {
  assertFails,
  assertSucceeds,
  type RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
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
    await setDoc(doc(db, 'users/alice'), { uid: 'alice', role: 'STUDENT', email: 'a@x.com' });
    await setDoc(doc(db, 'users/bob'), { uid: 'bob', role: 'STUDENT', email: 'b@x.com' });
    await setDoc(doc(db, 'users/admin'), { uid: 'admin', role: 'ADMIN', email: 'ad@x.com' });
  });
});

describe('users rules', () => {
  it('lets a student read their own profile', async () => {
    const alice = env.authenticatedContext('alice', { role: 'STUDENT' });
    await assertSucceeds(getDoc(doc(alice.firestore(), 'users/alice')));
  });

  it('forbids a student from reading another user', async () => {
    const alice = env.authenticatedContext('alice', { role: 'STUDENT' });
    await assertFails(getDoc(doc(alice.firestore(), 'users/bob')));
  });

  it('lets an admin read any user', async () => {
    const admin = env.authenticatedContext('admin', { role: 'ADMIN' });
    await assertSucceeds(getDoc(doc(admin.firestore(), 'users/alice')));
  });

  it('forbids unauthenticated access', async () => {
    const anon = env.unauthenticatedContext();
    await assertFails(getDoc(doc(anon.firestore(), 'users/alice')));
  });

  it('forbids a student from escalating their role', async () => {
    const alice = env.authenticatedContext('alice', { role: 'STUDENT' });
    await assertFails(
      updateDoc(doc(alice.firestore(), 'users/alice'), { role: 'ADMIN' }),
    );
  });

  it('lets a student update a non-role field', async () => {
    const alice = env.authenticatedContext('alice', { role: 'STUDENT' });
    await assertSucceeds(
      updateDoc(doc(alice.firestore(), 'users/alice'), { email: 'new@x.com' }),
    );
  });
});
