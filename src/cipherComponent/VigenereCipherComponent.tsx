import { useState } from "react";
import {
  vigenereDecrypt,
  vigenereEncrypt,
} from "../cipher-domain/vigenereCipher";
import Input from "../components/Input";
import { CipherLayout } from "../layout";
import { type InputKeyProps } from "../layout";
import { englishChars } from "../cipher-domain/constant";

export type VigenereKey = string;

export function InputKey({ onChange }: InputKeyProps<VigenereKey>) {
  const [value, setValue] = useState("");

  const handleChange = (value: string) => {
    const exist = value
      .split("")
      .find((char) => englishChars.includes(char) === false);

    if (value === "" || exist) {
      onChange(undefined);
    }

    onChange(value);
    setValue(value);
  };

  return (
    <Input
      label="clé"
      onChange={(e) => handleChange(e.target.value)}
      value={value}
    />
  );
}

export function VigenereCipherComponent() {
  return (
    <CipherLayout
      encrypt={vigenereEncrypt}
      decrypt={vigenereDecrypt}
      inputKey={InputKey}
    />
  );
}
