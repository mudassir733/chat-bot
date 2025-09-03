import { workerData, parentPort } from 'node:worker_threads';
import bcrypt from 'bcrypt';

(async () => {
  try {
    const salt = await bcrypt.genSalt(workerData.saltRounds);
    const hash = await bcrypt.hash(workerData.password, salt);
    parentPort?.postMessage(hash);
  } catch (error: any) {
    parentPort?.postMessage({ error: error.message });
  }
})();