import { englishChars, FB } from "./constant";
import { modulo } from "./utils";

export function vigenereEncrypt(plainText: string, key: string): string {
  const keyLength = key.length;

  return plainText
    .split("")
    .map((char, index) => {
      const keyChar = key[index % keyLength];
      const shift = englishChars.indexOf(keyChar);

      // verification the character of the key and the text
      if (shift === -1) {
        throw new Error(`Character of key not supported : ${keyChar}`);
      }
      const charIndex = englishChars.indexOf(char);
      if (charIndex === -1) {
        throw new Error(`Character of text not supported : ${char}`);
      }
      const newIndex = modulo(charIndex + shift + 1, FB);

      // encrypt char and return it
      return englishChars[newIndex];
    })
    .join("");
}

export function vigenereDecrypt(cipherText: string, key: string): string {
  const keyLength = key.length;
  return cipherText
    .split("")
    .map((char, index) => {
      const keyChar = key[index % keyLength];
      const shift = englishChars.indexOf(keyChar);

      // verification the character of the key and the text
      if (shift === -1) {
        throw new Error(`Character of key not supported : ${keyChar}`);
      }
      const charIndex = englishChars.indexOf(char);
      if (charIndex === -1) {
        throw new Error(`Character of text not supported : ${char}`);
      }

      // decrypt char and return it
      const newIndex = modulo(charIndex - shift - 1, FB);
      return englishChars[newIndex];
    })
    .join("");
}

export class VigenereCipher {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  encrypt(plainText: string): string {
    return vigenereEncrypt(plainText, this.key);
  }

  decrypt(cipherText: string): string {
    return vigenereDecrypt(cipherText, this.key);
  }
}

function test() {
  const cipher = new VigenereCipher("a");
  const encrypted = cipher.encrypt("HELLO");
  console.log("Encrypted:", encrypted);

  const decrypted = cipher.decrypt(encrypted);
  console.log("Decrypted:", decrypted);
}

test();
