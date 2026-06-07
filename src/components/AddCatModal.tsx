import { useState } from "react";
import type { Cat } from "../types";

interface Props {
  onClose: () => void;
  onAdd: (cat: Cat) => void;
}

export default function AddCatModal({ onClose, onAdd }: Props) {
  const [name, setName] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCatImage = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://api.thecatapi.com/v1/images/search");
      const data = await res.json();
      setPreviewUrl(data[0].url);
    } catch {
      alert("Erro ao buscar foto. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (!previewUrl) return alert("Busque uma foto primeiro.");
    if (!name.trim()) return alert("Digite um nome.");
    onAdd({
      id: crypto.randomUUID(),
      name: name.trim(),
      imageUrl: previewUrl,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl border border-gray-200 w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h2 className="text-sm font-semibold text-gray-900">Novo gato</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-lg leading-none cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 flex flex-col gap-3">
          {previewUrl ? (
            <div className="relative w-full h-48 rounded-md overflow-hidden border border-gray-200">
              <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-full h-48 border border-dashed border-gray-300 rounded-md flex items-center justify-center text-sm text-gray-400">
              Sem foto
            </div>
          )}

          <button
            onClick={fetchCatImage}
            disabled={loading}
            className="w-full py-2 text-sm border border-gray-200 rounded-md text-gray-600 bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? "Buscando..." : previewUrl ? "Buscar outra foto" : "Buscar foto aleatória"}
          </button>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">Nome</label>
            <input
              type="text"
              placeholder="Nome do gato"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-gray-900 placeholder:text-gray-300"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-2 px-5 py-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="flex-1 py-2 text-sm border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="flex-[2] py-2 text-sm bg-gray-900 text-white rounded-md font-medium hover:bg-gray-700 cursor-pointer"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}