export const modulo = (a: number, m: number): number => {
  const mod = a % m;
  const result = mod >= 0 ? mod : mod + m;

  return result;
};

export const modInverse = (a: number, m: number): number | null => {
  a = ((a % m) + m) % m;
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) {
      return x;
    }
  }
  return null; // Inverse does not exist
};
