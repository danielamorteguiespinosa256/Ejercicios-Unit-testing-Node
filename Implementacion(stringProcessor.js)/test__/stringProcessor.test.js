const { maskEmail, reverseWords, extractHashtags } = require('../src/stringProcessor');

describe('Pruebas para stringProcessor.js', () => {

  // ==========================================
  // Tests: maskEmail(email)
  // ==========================================
  describe('Función: maskEmail', () => {
    test('email normal: oculta el usuario dejando el primer y último carácter', () => {
      expect(maskEmail('sergio@gmail.com')).toBe('s****o@gmail.com');
      expect(maskEmail('alex@hotmail.com')).toBe('a**x@hotmail.com');
    });

    test('usuario de 1 char: devuelve el email intacto', () => {
      expect(maskEmail('a@domain.com')).toBe('a@domain.com');
    });

    test('email sin @: lanza un Error', () => {
      expect(() => maskEmail('sergiogmail.com')).toThrow(Error);
    });
  });

  // ==========================================
  // Tests: reverseWords(sentence)
  // ==========================================
  describe('Función: reverseWords', () => {
    test('oración normal: invierte el orden de las palabras correctamente', () => {
      expect(reverseWords('hola mundo node')).toBe('node mundo hola');
    });

    test('espacios múltiples: maneja y limpia espacios adicionales entre palabras', () => {
      expect(reverseWords('  javascript   es   genial  ')).toBe('genial es javascript');
    });

    test('texto vacío: devuelve una cadena vacía si es solo espacios o vacío', () => {
      expect(reverseWords('')).toBe('');
      expect(reverseWords('   ')).toBe('');
    });

    test('una sola palabra: devuelve la misma palabra sin alterar', () => {
      expect(reverseWords('Hola')).toBe('Hola');
    });
  });

  // ==========================================
  // Tests: extractHashtags(text)
  // ==========================================
  describe('Función: extractHashtags', () => {
    test('múltiples hashtags: extrae todos los hashtags válidos de la cadena', () => {
      const text = 'Me gusta #node y #testing en #2026';
      expect(extractHashtags(text)).toEqual(['#node', '#testing', '#2026']);
    });

    test('sin hashtags: devuelve un array vacío si no se encuentran coincidencias', () => {
      expect(extractHashtags('Texto plano sin etiquetas')).toEqual([]);
    });

    test('# solo (sin texto después): no debe tomar el símbolo solo como hashtag', () => {
      expect(extractHashtags('Esto es un símbolo # solo en el texto')).toEqual([]);
      expect(extractHashtags('## # #ayuda')).toEqual(['#ayuda']);
    });
  });

});