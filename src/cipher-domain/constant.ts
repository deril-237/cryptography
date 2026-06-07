export const englishChars =
  // miniscules
  "abcdefghijklmnopqrstuvwxyz" +
  // Lettres majuscules
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
  // Chiffres
  "0123456789" +
  // Ponctuation courante
  ".!?,;:'\"()[]{}/-\\_" +
  // Tirets & ellipsis
  "\u2014\u2013\u2026" + // — – …
  // Symboles spéciaux
  "@#$%^&*+=<>~`|" +
  // Symboles typographiques
  "\u00A9\u00AE\u2122\u00B0\u00A7\u00B6\u2020\u2021" + // © ® ™ ° § ¶ † ‡
  // Monnaies
  "\u00A3\u20AC\u00A2\u00A5" + // £ € ¢ ¥
  // Fractions
  "\u00BD\u00BC\u00BE\u2153\u2154" + // ½ ¼ ¾ ⅓ ⅔
  // Symboles mathématiques
  "\u2212\u00D7\u00F7\u2260\u2248\u221E\u221A\u2211\u03C0" + // − × ÷ ≠ ≈ ∞ √ ∑ π
  " " +
  "éèçà";

export const FB = 127;
englishChars.split("").forEach((value, index) => {
  console.log(value, index);
});
