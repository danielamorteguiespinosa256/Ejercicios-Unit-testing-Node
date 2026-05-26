// ==========================================
// Función 1 — maskEmail(email)
// ==========================================
function maskEmail(email) {
  if (typeof email !== 'string' || !email.includes('@')) {
    throw new Error('El argumento debe ser un correo electrónico válido conteniendo "@".');
  }

  const [username, domain] = email.split('@');

  // Si el usuario tiene 1 o menos caracteres, se devuelve sin cambios
  if (username.length <= 1) {
    return email;
  }

  const firstChar = username[0];
  const lastChar = username[username.length - 1];
  const maskedLength = username.length - 2;
  const asterisks = '*'.repeat(maskedLength);

  return `${firstChar}${asterisks}${lastChar}@${domain}`;
}

// ==========================================
// Función 2 — reverseWords(sentence)
// ==========================================
function reverseWords(sentence) {
  if (typeof sentence !== 'string') {
    return "";
  }

  // Trim remueve espacios extremos; split(/\s+/) divide por uno o más espacios en blanco
  const words = sentence.trim().split(/\s+/);

  // Si después del trim quedó un string vacío, el array tendrá [""]
  if (words.length === 1 && words[0] === "") {
    return "";
  }

  return words.reverse().join(' ');
}

// ==========================================
// Función 3 — extractHashtags(text)
// ==========================================
function extractHashtags(text) {
  if (typeof text !== 'string' || text.trim() === "") {
    return [];
  }

  // Captura el símbolo # seguido de caracteres alfanuméricos (letras o números)
  const regex = /#[a-zA-Z0-9]+/g;
  const matches = text.match(regex);

  return matches ? matches : [];
}

module.exports = {
  maskEmail,
  reverseWords,
  extractHashtags
};