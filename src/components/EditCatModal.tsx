import { useState } from "react";
import type { Cat } from "../types";

interface Props {
  cat: Cat;
  onClose: () => void;
  onSave: (cat: Cat) => void;
}

export default function EditCatModal({ cat, onClose, onSave }: Props) {
  const [name, setName] = useState(cat.name);
  const [imageUrl, setImageUrl] = useState(cat.imageUrl);
  const [loading, setLoading] = useState(false);

  const fetchNewImage = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://api.thecatapi.com/v1/images/search");
      const data = await res.json();
      setImageUrl(data[0].url);
    } catch {
      alert("Erro ao buscar nova foto.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (!name.trim()) return alert("Digite um nome.");
    onSave({ ...cat, name, imageUrl });
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
          <h2 className="text-sm font-semibold text-gray-900">Editar gato</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-lg leading-none cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 flex flex-col gap-3">
          <div className="relative w-full h-48 rounded-md overflow-hidden border border-gray-200">
            <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
          </div>

          <button
            onClick={fetchNewImage}
            disabled={loading}
            className="w-full py-2 text-sm border border-gray-200 rounded-md text-gray-600 bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? "Buscando..." : "Trocar foto"}
          </button>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-gray-900"
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
            onClick={handleSave}
            className="flex-[2] py-2 text-sm bg-gray-900 text-white rounded-md font-medium hover:bg-gray-700 cursor-pointer"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}