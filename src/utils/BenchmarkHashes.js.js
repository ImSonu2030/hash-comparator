import { MD5, SHA1, SHA256 } from "./HashFunctions.js";

export const benchmarkHashes = async (inputBytes, iterations = 10) => {
  const algos = { MD5, SHA1, SHA256 };
  const results = [];

  for (const fn of Object.values(algos)) {
    await fn(inputBytes);
  }

  for (const [name, fn] of Object.entries(algos)) {
    const times = [];

    for (let i = 0; i < iterations; i++) {
      const start = performance.now();
      await fn(inputBytes);
      const end = performance.now();
      times.push(end - start);
    }

    const avg =
      times.reduce((sum, t) => sum + t, 0) / times.length;
    const min = Math.min(...times);
    const max = Math.max(...times);

    results.push({
      algorithm: name,
      average: avg.toFixed(3),
      min: min.toFixed(3),
      max: max.toFixed(3),
      raw: times.map(t => t.toFixed(3))
    });
  }
  return results;
};
