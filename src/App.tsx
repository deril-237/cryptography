import { useState } from "react";
import { CesarCipherComponent } from "./cipherComponent/CesarCipherComponent";
import { VigenereCipherComponent } from "./cipherComponent/VigenereCipherComponent";
import { HillCipherComponent } from "./cipherComponent/HillCipherComponent";
// import { ShieldCheck } from "lucide-react";
import { englishChars } from "./cipher-domain/constant";

type CipherTab = {
  cipherKey: string;
  component: React.ReactNode;
  cipherLabel: string;
  description: string;
};

const ciphers: Record<string, CipherTab> = {
  caesar: {
    cipherKey: "caesar",
    component: <CesarCipherComponent />,
    cipherLabel: "César",
    description: "Décalage alphabétique",
  },
  vigenere: {
    cipherKey: "vigenere",
    component: <VigenereCipherComponent />,
    cipherLabel: "Vigenère",
    description: "Chiffrement polyalphabétique",
  },
  hill: {
    cipherKey: "hill",
    component: <HillCipherComponent />,
    cipherLabel: "Hill",
    description: "Chiffrement matriciel 2×2",
  },
};

function App() {
  const [selectedCipher, setSelectedCipher] = useState("caesar");

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center gap-3">
          <div className="bg-blue-50 text-blue-600 p-2 rounded-xl">
            {/* <ShieldCheck size={24} /> */}
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800 leading-tight">
              Cipher Lab
            </h1>
            <p className="text-xs text-gray-400">
              Chiffrement & Déchiffrement classique
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-6 ">
        {/* Tab selector */}
        <div className="grid grid-cols-3 gap-4">
          {Object.values(ciphers).map((cipher) => {
            const isSelected = selectedCipher === cipher.cipherKey;
            return (
              <button
                key={cipher.cipherKey}
                onClick={() => setSelectedCipher(cipher.cipherKey)}
                className={`
                  flex flex-col items-start gap-1 p-4 rounded-2xl border-2 text-left
                  transition-all duration-200 cursor-pointer
                  ${
                    isSelected
                      ? "border-blue-500 bg-blue-500 text-white shadow-md"
                      : "border-gray-200 bg-white text-gray-700 hover:border-blue-200 hover:bg-gray-50"
                  }
                `}
              >
                <span className="font-semibold text-sm">
                  {cipher.cipherLabel}
                </span>
                <span
                  className={`text-xs ${isSelected ? "text-blue-100" : "text-gray-400"}`}
                >
                  {cipher.description}
                </span>
              </button>
            );
          })}
        </div>

        {/* Cipher panel */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm pb-4">
          <div className="border-b border-gray-100 px-8 py-5">
            <h2 className="font-bold text-gray-800">
              {ciphers[selectedCipher].cipherLabel} Cipher
            </h2>
            <p className="text-sm text-gray-400 mt-0.5">
              {ciphers[selectedCipher].description}
            </p>
          </div>
          <div className="px-8 py-8">{ciphers[selectedCipher].component}</div>
          <div className="bg-indigo-400 mt-3 mx-8 px-4 py-4 rounded-lg space-y-2">
            <h2 className="text-xl">Alphabet</h2>
            <div className="grid grid-cols-10 gap-6">
              {englishChars.split("").map((char, index) => (
                <div className="bg-white w-12 h-10 text-black rounded-lg text-nowrap text-center flex flex-row justify-center items-center cursor-pointer hover:bg-gray-400 hover:text-white transition-all">
                  {char}-{index}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
