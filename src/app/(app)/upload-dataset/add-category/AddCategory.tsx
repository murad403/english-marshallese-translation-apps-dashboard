/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useAddCategoryMutation, useDeleteCategoryMutation, useGetCategoriesQuery, useUpdateCategoryMutation } from '@/redux/features/dataset/dataset.api';
import { TCategory } from '@/types/alltypes';
import { Pencil, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { IoCheckmark } from 'react-icons/io5';
import { toast } from 'react-toastify';


const AddCategory = () => {
  const { data } = useGetCategoriesQuery(undefined);
  const categories = data?.data?.categories;
  // console.log(categories);
  const [addCategory] = useAddCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [newLabel, setNewLabel] = useState('');


  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [isAddingNew, setIsAddingNew] = useState(false);


  const handleEdit = (id: number) => {
    setEditingIndex(id);
    const categoryToEdit = categories?.find((cat: TCategory) => cat.id === id);
    setEditValue(categoryToEdit?.name || '');
  };

  const handleSaveEdit = async(id: number) => {
    try {
      const result = await updateCategory({ id: id, data: {name: editValue} }).unwrap();
      toast.success(result?.message);
      setEditingIndex(null);
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };



  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditValue('');
  };

  // delete category
  const handleDelete = async (id: number) => {
    try {
      const result = await deleteCategory(id).unwrap();
      toast.success(result?.message);
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  // add new category
  const handleAddNew = async () => {
    try {
      const result = await addCategory({ name: newLabel, context: newLabel }).unwrap();
      toast.success(result?.message);
      setNewLabel("");
      setIsAddingNew(false);
    } catch (error: any) {
      toast.error("Please try again");
    }
  };

  return (
    <div className="bg-main p-8 rounded-xl">
      <div className="flex flex-wrap gap-3 mb-8">
        {categories?.map((category: TCategory) => (
          <div
            key={category?.id}
            className="bg-[#E9EFFA] text-title p-2 rounded-xl border-[0.5px] border-heading flex items-center gap-5 min-w-32 justify-between"
          >
            {editingIndex === category?.id ? (
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                // onBlur={() => handleSaveEdit()}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveEdit(category?.id);
                  if (e.key === 'Escape') handleCancelEdit();
                }}
                autoFocus
                className="bg-transparent appearance-none border-none outline-none text-title"
              />
            ) : (
              <span className="font-medium">{category?.name}</span>
            )}


            <div className="flex gap-2 text-title">
              {editingIndex !== category?.id && (
                <>
                  <button
                    onClick={() => handleEdit(category?.id)}
                  >
                    <Pencil size={18} />
                  </button>
                  <button onClick={() => handleDelete(category?.id)}>
                    <Trash2 size={18} />
                  </button>
                </>
              )}
              {editingIndex === category?.id && (
                <div className='flex items-center gap-2'>
                  <button
                    onClick={handleCancelEdit}
                    className="text-gray-600 text-xs"
                  >
                    <X size={18} />
                  </button>
                  <button
                    onClick={() => handleSaveEdit(category?.id)}
                    className="text-gray-600 text-xs"
                  >
                    <IoCheckmark size={18} />
                  </button>
                </div>
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