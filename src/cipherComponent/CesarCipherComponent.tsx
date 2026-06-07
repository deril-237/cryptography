import { cesarDecrypt, cesarEncrypt } from "../cipher-domain/cesarCipher";
import Input from "../components/Input";
import { CipherLayout, type InputKeyProps } from "../layout";
import { useState } from "react";

type AffineCipherKey = {
  a: number;
  b: number;
};

type PartialKey = Record<keyof AffineCipherKey, string>;

export function InputKey({ onChange, value }: InputKeyProps<AffineCipherKey>) {
  const [local, setLocal] = useState<PartialKey>({
    a: value?.a?.toString() ?? "",
    b: value?.b?.toString() ?? "",
  });

  const [internalErrors, setErrors] = useState({
    a: "",
    b: "",
  });

  const handleChange = (field: keyof PartialKey, raw: string) => {
    const next = { ...local, [field]: raw };
    setLocal(next);

    const a = Number(next.a);
    const b = Number(next.b);
    if (!(next.a === "" || next.b === "" || isNaN(a) || isNaN(b) || a === 0)) {
      onChange({ a, b });
      return;
    }

    onChange(undefined);
    const errors = { a: "", b: "" };
    if (next.a === "") {
      errors.a = "a est requis";
    }

    if (next.b === "") {
      errors.b = "b est requis";
    }

    if (isNaN(a)) {
      errors.a = "a doit etre un nombre";
    }

    if (isNaN(b)) {
      errors.b = "b doit etre un nombre";
    }

    if (a === 0) {
      errors.a = "a ne doit pas etre egale à zero";
    }
    setErrors(errors);
  };

  return (
    <div className="w-full flex">
      <div className="flex flex-col md:flex-row w-full gap-2">
        <div className="w-full md:w-1/2">
          <Input
            label="A"
            placeholder="Entrer un nombre"
            value={local.a}
            onChange={(e) => handleChange("a", e.target.value)}
            error={internalErrors.a || undefined}
          />
        </div>
        <div className="w-full md:w-1/2">
          <Input
            label="B"
            placeholder="Entrer un nombre"
            value={local.b}
            onChange={(e) => handleChange("b", e.target.value)}
            error={internalErrors.b || undefined}
          />
        </div>
      </div>
      {/* {error && <p className="text-red-500 text-sm mt-1">{error}</p>} */}
    </div>
  );
}

export function CesarCipherComponent() {
  return (
    <CipherLayout
      inputKey={InputKey}
      encrypt={cesarEncrypt}
      decrypt={cesarDecrypt}
    />
  );
}
