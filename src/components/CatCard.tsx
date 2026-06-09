import type { Cat } from "../types";

interface Props {
  cat: Cat;
  onEdit: () => void;
  onDelete: () => void;
}

export default function CatCard({ cat, onEdit, onDelete }: Props) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="relative h-44 bg-gray-100">
        <img
          src={cat.imageUrl}
          alt={cat.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3 border-t border-gray-200">
        <p className="text-sm font-semibold text-gray-900 mb-2">{cat.name}</p>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="flex-1 py-1.5 text-xs border border-gray-200 rounded text-gray-600 hover:bg-gray-50 cursor-pointer"
          >
            Editar
          </button>
          <button
            onClick={onDelete}
            className="flex-1 py-1.5 text-xs border border-gray-200 rounded text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 cursor-pointer"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}