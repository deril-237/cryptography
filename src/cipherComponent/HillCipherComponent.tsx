import { useState } from "react";
import Input from "../components/Input";
import { CipherLayout } from "../layout";
import { type InputKeyProps } from "../layout";
import { hillCipher, hillDecipher } from "../cipher-domain/hillCipher";

type HillKey = number[][];
type MatrixFields = { a: string; b: string; c: string; d: string };

export function InputKey({ onChange, error }: InputKeyProps<HillKey>) {
  const [matrix, setMatrix] = useState<MatrixFields>({
    a: "",
    b: "",
    c: "",
    d: "",
  });

  const handleChange = (field: keyof MatrixFields, raw: string) => {
    const updated = { ...matrix, [field]: raw };
    setMatrix(updated);

    const values = [updated.a, updated.b, updated.c, updated.d];
    const hasEmpty = values.some((v) => v === "");
    const hasNaN = values.some((v) => isNaN(Number(v)));

    if (hasEmpty || hasNaN) {
      onChange(undefined);
      return;
    }

    const [a, b, c, d] = values.map(Number);
    onChange([
      [a, b],
      [c, d],
    ]);
  };

  return (
    <div className="flex flex-col gap-1">
      <label>Clé (matrice 2×2)</label>
      <div className="grid grid-cols-2 gap-2 w-40">
        {(["a", "b", "c", "d"] as const).map((field) => (
          <Input
            key={field}
            type="number"
            value={matrix[field]}
            onChange={(e) => handleChange(field, e.target.value)}
            placeholder={field.toUpperCase()}
          />
        ))}
      </div>
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
}

export function HillCipherComponent() {
  return (
    <CipherLayout<HillKey>
      encrypt={hillCipher}
      decrypt={hillDecipher}
      inputKey={InputKey}
    />
  );
}
