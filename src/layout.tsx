import { useState, type ReactNode } from "react";
import { SelectAction, type Action } from "./components/SelectAction";
import { Controller, useForm } from "react-hook-form";

export type InputKeyProps<Key> = {
  onChange: (key: Key | undefined) => void;
  value: Key | undefined;
  error: string | undefined;
};

type FormCipher<T> = {
  key: T | undefined;
  action: Action["value"];
  text: string;
};

type CipherLayoutProps<Key = unknown> = {
  inputKey: (props: InputKeyProps<Key>) => ReactNode;
  encrypt: (text: string, key: Key) => string;
  decrypt: (text: string, key: Key) => string;
  verifyKey?: (key: Key) => boolean;
};

export function CipherLayout<T = unknown>({
  encrypt,
  decrypt,
  inputKey,
  verifyKey,
}: CipherLayoutProps<T>) {
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<FormCipher<T>>();
  const [result, setResult] = useState("");

  const submit = handleSubmit((data: FormCipher<T>) => {
    if (!data.key) {
      setError("key", { message: "Clé requise" });
      console.log("error");
      return;
    }
    try {
      console.log("ok");
      const action = data.action === "decrypt" ? decrypt : encrypt;
      const result = action(data.text, data.key);
      setResult(result);
    } catch (error) {
      console.log(error);
      setError(error instanceof Error ? "key" : "text", {
        message: error instanceof Error ? error.message : "Erreur inconnue",
      });
    }
  });

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="space-y-4 w-full md:w-1/2">
        <SelectAction {...register("action")} />
        <div className="flex flex-col">
          <Controller
            control={control}
            name="key"
            rules={{
              validate: (data) => {
                if (!data) {
                  return "Clé requise";
                }

                if (verifyKey && !verifyKey(data)) {
                  return "clé invalide";
                }
                return true;
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                {inputKey({
                  onChange: (key) => onChange(key),
                  value: value as T | undefined,
                  error: error?.message,
                })}
                {/* {error && (
                  <span className="text-red-500 text-sm mt-1">
                    {error.message}
                  </span>
                )} */}
              </>
            )}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Texte</label>
          <textarea
            {...register("text")}
            id=""
            className="outline-blue-500 border-2 border-gray-300 rounded-lg px-2"
            rows={5}
            cols={5}
          ></textarea>
          {errors.text && (
            <p className="text-red-500 text-sm mt-1">{errors.text.message}</p>
          )}
        </div>
        <button
          className="bg-blue-500 text-white p-2 rounded-lg cursor-pointer
      "
          onClick={submit}
        >
          Executer
        </button>
      </div>
      <div className="w-full md:w-1/2">
        <div className="text-xl font-bold">Resultat</div>
        <div className="bg-zinc-200 h-96 px-4 py-4 rounded-lg">
          {result ||
            "Le résultat s'affichera ici après l'exécution du chiffrement ou du déchiffrement ."}
        </div>
      </div>
    </div>
  );
}
