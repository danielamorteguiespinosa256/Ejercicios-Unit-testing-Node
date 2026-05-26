const { factorial, isPrime, clamp } = require('../src/numberUtils');

describe('Pruebas para numberUtils.js', () => {


  // Tests: factorial(n)

  describe('Función: factorial', () => {
    test('caso normal: devuelve el factorial correcto para un número positivo', () => {
      expect(factorial(5)).toBe(120);
      expect(factorial(4)).toBe(24);
    });

    test('caso de n=0: debe devolver 1 por definición', () => {
      expect(factorial(0)).toBe(1);
    });

    test('negativo: lanza un RangeError si n es menor que 0', () => {
      expect(() => factorial(-5)).toThrow(RangeError);
    });

    test('decimal: lanza un TypeError si n no es un entero', () => {
      expect(() => factorial(5.5)).toThrow(TypeError);
      expect(() => factorial('5')).toThrow(TypeError);
    });
  });


  // Tests: isPrime(n)

  describe('Función: isPrime', () => {
    test('primo conocido: devuelve true para números primos', () => {
      expect(isPrime(2)).toBe(true);
      expect(isPrime(3)).toBe(true);
      expect(isPrime(11)).toBe(true);
      expect(isPrime(13)).toBe(true);
    });

    test('no primo: devuelve false para números compuestos', () => {
      expect(isPrime(4)).toBe(false);
      expect(isPrime(9)).toBe(false);
      expect(isPrime(15)).toBe(false);
    });

    test('casos límite (0 y 1): devuelve false', () => {
      expect(isPrime(0)).toBe(false);
      expect(isPrime(1)).toBe(false);
    });

    test('número negativo: devuelve false', () => {
      expect(isPrime(-7)).toBe(false);
    });
  });

 
  // Tests: clamp(value, min, max)
  
  describe('Función: clamp', () => {
    test('valor dentro del rango: devuelve el propio valor', () => {
      expect(clamp(5, 1, 10)).toBe(5);
    });

    test('valor menor: devuelve el límite inferior (min)', () => {
      expect(clamp(-2, 0, 10)).toBe(0);
    });

    test('valor mayor: devuelve el límite superior (max)', () => {
      expect(clamp(15, 0, 10)).toBe(10);
    });

    test('min === max: funciona correctamente cuando los límites son iguales', () => {
      expect(clamp(5, 5, 5)).toBe(5);
      expect(clamp(2, 5, 5)).toBe(5);
      expect(clamp(8, 5, 5)).toBe(5);
    });

    test('min > max: lanza un RangeError', () => {
      expect(() => clamp(5, 10, 1)).toThrow(RangeError);
    });
  });

});