import { parentPort } from 'worker_threads';
import { CSPSolver } from '../usecases/cspSolver';
import type { CSPProblem } from '../../domain/model/cspTypes';

if (parentPort) {
  parentPort.on('message', (problem: CSPProblem) => {
    try {
      const solver = new CSPSolver(60_000);
      const result = solver.solve(problem);
      parentPort?.postMessage({ success: true, result });
    } catch (error: any) {
      parentPort?.postMessage({ success: false, error: error.message });
    }
  });
}
