
// Función 1 — factorial(n)

function factorial(n) {
  if (typeof n !== 'number' || !Number.isInteger(n)) {
    throw new TypeError('El argumento debe ser un número entero.');
  }
  if (n < 0) {
    throw new RangeError('El número no puede ser negativo.');
  }
  
  if (n === 0 || n === 1) {
    return 1;
  }
  
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}


// Función 2 — isPrime(n)

function isPrime(n) {
  if (typeof n !== 'number' || !Number.isInteger(n) || n < 2) {
    return false;
  }
  
  // El 2 es el único primo par
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  
  // Buscamos divisores hasta la raíz cuadrada de n
  const limit = Math.sqrt(n);
  for (let i = 3; i <= limit; i += 2) {
    if (n % i === 0) {
      return false;
    }
  }
  
  return true;
}


// Función 3 — clamp(value, min, max)

function clamp(value, min, max) {
  if (min > max) {
    throw new RangeError('El valor mínimo no puede ser mayor que el valor máximo.');
  }
  
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}

module.exports = {
  factorial,
  isPrime,
  clamp
};