import { englishChars, FB } from "./constant";
import { modInverse, modulo } from "./utils";

export function cesarEncrypt(
  text: string,
  key: { a: number; b: number },
): string {
  if (key.a === 0) {
    throw new Error(`a ne pas etre égale à zéro`);
  }
  const textEncrypted = text.split("").map((char) => {
    const index = englishChars.indexOf(char);

    if (index === -1) {
      throw new Error(`Caractère non pris en charge : ${char}`);
    }

    const newIndex = modulo(key.a * index + key.b, FB);
    return englishChars[newIndex];
  });

  return textEncrypted.join("");
}

export function cesarDecrypt(
  text: string,
  key: { a: number; b: number },
): string {
  const aInverse = modInverse(key.a, FB);
  if (aInverse === null) {
    throw new Error(`L'inverse de a n'existe pas pour a=${key.a} et FB=${FB}`);
  }

  const textDecrypted = text.split("").map((char) => {
    const index = englishChars.indexOf(char);
    if (index === -1) {
      throw new Error(`Caractère non pris en charge : ${char}`);
    }
    const newIndex = (aInverse * (index - key.b + FB)) % FB;
    return englishChars[newIndex];
  });

  return textDecrypted.join("");
}

function test() {
  const cipher = new CesareanCipher(1, -1);
  const encrypted = cipher.encrypt("HELLO");
  console.log("Encrypted:", encrypted);

  const decrypted = cipher.decrypt(encrypted);
  console.log("Decrypted:", decrypted);
}

export class CesareanCipher {
  private key: { a: number; b: number };

  constructor(a: number, b: number) {
    this.key = { a, b };
  }

  encrypt(text: string): string {
    return cesarEncrypt(text, this.key);
  }

  decrypt(text: string): string {
    return cesarDecrypt(text, this.key);
  }
}

export default CesareanCipher;

test();
