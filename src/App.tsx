import { useState } from "react";
import type { Cat } from "./types";
import CatCard from "./components/CatCard";
import AddCatModal from "./components/AddCatModal";
import EditCatModal from "./components/EditCatModal";

export default function App() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCat, setEditingCat] = useState<Cat | null>(null);

  const addCat = (cat: Cat) => setCats((prev) => [cat, ...prev]);
  const updateCat = (updated: Cat) =>
    setCats((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  const deleteCat = (id: string) =>
    setCats((prev) => prev.filter((c) => c.id !== id));

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-gray-200">
        <h1 className="text-sm font-semibold">Gatinhos kkkkk</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-gray-900 text-white text-sm px-4 py-2 rounded-md hover:bg-gray-700 cursor-pointer"
        >
          + Adicionar
        </button>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-8 py-8">
        {cats.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
            <p className="text-sm font-medium text-gray-900">Nenhum gato cadastrado</p>
            <p className="text-sm text-gray-400">Clique em "Adicionar" para começar.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {cats.map((cat) => (
                <CatCard
                  key={cat.id}
                  cat={cat}
                  onEdit={() => setEditingCat(cat)}
                  onDelete={() => deleteCat(cat.id)}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {showAddModal && (
        <AddCatModal onClose={() => setShowAddModal(false)} onAdd={addCat} />
      )}
      {editingCat && (
        <EditCatModal
          cat={editingCat}
          onClose={() => setEditingCat(null)}
          onSave={updateCat}
        />
      )}
    </div>
  );
}