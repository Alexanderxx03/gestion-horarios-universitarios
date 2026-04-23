import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  initializeTestEnvironment,
  type RulesTestEnvironment,
} from '@firebase/rules-unit-testing';

const PROJECT_ID = 'demo-planner';

export async function setupTestEnv(): Promise<RulesTestEnvironment> {
  const rules = readFileSync(resolve(__dirname, '..', '..', 'firestore.rules'), 'utf8');
  return initializeTestEnvironment({
    projectId: PROJECT_ID,
    firestore: {
      rules,
      host: '127.0.0.1',
      port: 8080,
    },
  });
}

export interface RoleClaims {
  role?: 'ADMIN' | 'COORDINATOR' | 'TEACHER' | 'STUDENT';
}
