import { englishChars, FB } from "./constant";
import { modulo, modInverse } from "./utils";

const blockSize = 2; // For a 2x2 key matrix
const paddingChar = "X"; // Character used for padding

function calculateDet(key: number[][]): number {
  return key[0][0] * key[1][1] - key[0][1] * key[1][0];
}

function validateKey(key: number[][]): void {
  if (
    key.length !== blockSize ||
    key[0]?.length !== blockSize ||
    key[1]?.length !== blockSize
  ) {
    throw new Error("Invalid key matrix dimensions");
  }

  if (calculateDet(key) === 0) {
    throw new Error("Key matrix is not invertible");
  }
}

function inverseKey(key: number[][]): number[][] {
  const det = calculateDet(key);
  if (det === 0) {
    throw new Error("Key matrix is not invertible");
  }

  const detInverse = modInverse(det, FB);
  if (detInverse === null) {
    throw new Error("Determinant inverse does not exist");
  }

  return [
    [modulo(key[1][1] * detInverse, FB), modulo(-key[0][1] * detInverse, FB)],
    [modulo(-key[1][0] * detInverse, FB), modulo(key[0][0] * detInverse, FB)],
  ];
}

function validateString(text: string): void {
  for (const char of text) {
    if (!englishChars.includes(char)) {
      throw new Error(`Character not supported : ${char}`);
    }
  }
}

export function hillCipher(text: string, key: number[][]): string {
  let finalText = text;

  validateKey(key);

  validateString(text);
  // Implementation for Hill Cipher would go here
  // This is a placeholder - replace with actual Hill Cipher logic

  // Pad the text if necessary
  if (finalText.length % blockSize !== 0) {
    finalText += paddingChar.repeat(blockSize - (finalText.length % blockSize));
  }

  const blocks = finalText.match(new RegExp(`.{1,${blockSize}}`, "g")) || [];

  const encryptedBlocks = blocks.map((block) => {
    const vector = block.split("").map((char) => englishChars.indexOf(char));
    const encryptedVector = [0, 0];

    for (let i = 0; i < blockSize; i++) {
      for (let j = 0; j < blockSize; j++) {
        encryptedVector[i] += key[i][j] * vector[j];
      }

      encryptedVector[i] = modulo(encryptedVector[i], FB);
    }

    // console.log(
    //   `Encrypting block: ${block} with vector: ${vector} ${encryptedVector}`,
    // );
    return encryptedVector.map((index) => englishChars[index]).join("");
  });

  return encryptedBlocks.join("");
}

export function hillDecipher(text: string, key: number[][]): string {
  // Implementation for Hill Decipher would go here
  // This is a placeholder - replace with actual Hill Decipher logic

  const inverseKeyMatrix = inverseKey(key);
  console.log("Inverse Key Matrix:", inverseKeyMatrix);
  const decryptedText = hillCipher(text, inverseKeyMatrix); // This will use the same function for decryption with the inverse key

  return decryptedText; // Placeholder return
}

function test() {
  try {
    const key = [
      [3, 3],
      [2, 5],
    ];

    const text = "HELLO";

    const encrypted = hillCipher(text, key);

    const decryptedText = hillDecipher(encrypted, key);

    console.log("Encrypted:", encrypted);
    console.log("Decrypted:", decryptedText);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return;
    }

    throw error;
  }
}

// Uncomment the following line to run the test function
test();
