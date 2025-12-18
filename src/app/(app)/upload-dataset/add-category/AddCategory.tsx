"use client"
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';

type TCategory = {
  value: string;
  label: string;
};

const AddCategory = () => {
  const [categories, setCategories] = useState<TCategory[]>([
    { value: "body parts", label: "Body Parts" },
    { value: "question", label: "Question" },
    { value: "general", label: "General" },
    { value: "medication", label: "Medication" },
    { value: "common", label: "Common" },
    { value: "symptoms", label: "Symptoms" },
    { value: "emergency", label: "Emergency" },
    { value: "medical staff", label: "Medical Staff" },
  ]);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newLabel, setNewLabel] = useState('');

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditValue(categories[index].label);
  };

  const handleSaveEdit = (index: number) => {
    if (editValue.trim()) {
      const updated = [...categories];
      updated[index].label = editValue.trim();
      updated[index].value = editValue.trim().toLowerCase().replace(/\s+/g, ' ');
      setCategories(updated);
    }
    setEditingIndex(null);
    setEditValue('');
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditValue('');
  };

  const handleDelete = (index: number) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const handleAddNew = () => {
    if (newLabel.trim()) {
      const newCat: TCategory = {
        label: newLabel.trim(),
        value: newLabel.trim().toLowerCase().replace(/\s+/g, ' '),
      };
      setCategories([...categories, newCat]);
      setNewLabel('');
      setIsAddingNew(false);
    }
  };

  return (
    <div className="bg-main p-8 rounded-xl">
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="bg-[#E9EFFA] text-title px-4 py-2 rounded-xl border-[0.5px] border-heading flex items-center gap-5 min-w-32 justify-between"
          >
            {editingIndex === index ? (
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={() => handleSaveEdit(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveEdit(index);
                  if (e.key === 'Escape') handleCancelEdit();
                }}
                autoFocus
                className="bg-transparent appearance-none border-none outline-none text-title"
              />
            ) : (
              <span className="font-medium">{cat.label}</span>
            )}

            <div className="flex gap-2 text-title">
              {editingIndex !== index && (
                <>
                  <button
                    onClick={() => handleEdit(index)}
                    className=""
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className=""
                  >
                    <Trash2 size={18} />
                  </button>
                </>
              )}
              {editingIndex === index && (
                <button
                  onClick={() => handleCancelEdit()}
                  className="text-gray-600 text-xs"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        ))}

        {isAddingNew && (
          <div className="bg-[#E9EFFA] text-title px-4 py-2 rounded-xl flex items-center gap-2">
            <input
              type="text"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              onBlur={handleAddNew}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddNew();
                if (e.key === 'Escape') setIsAddingNew(false);
              }}
              placeholder="New category"
              autoFocus
              className="bg-transparent placeholder:text-title appearance-none border-none outline-none text-title"
            />
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => setIsAddingNew(true)}
          className="bg-common text-main px-6 py-3 rounded-lg font-medium"
        >
          Add New Category
        </button>
      </div>
    </div>
  );
};

export default AddCategory;