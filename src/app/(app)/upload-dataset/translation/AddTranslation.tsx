// "use client"
// import { useState } from 'react';
// import { IoIosAddCircleOutline } from 'react-icons/io';
// import { X } from 'lucide-react';

// type TTranslationTag = {
//   value: string;
//   label: string;
// };

// const AddTranslation = () => {
//   const [tags, setTags] = useState<TTranslationTag[]>([
//     { value: "medical", label: "Medical" },
//     { value: "medical2", label: "Medical" },
//     { value: "write-here", label: "Write here" },
//   ]);

//   const [isAddingNew, setIsAddingNew] = useState(false);
//   const [newLabel, setNewLabel] = useState('');

//   const handleAddNew = () => {
//     if (newLabel.trim()) {
//       const newTag: TTranslationTag = {
//         label: newLabel.trim(),
//         value: newLabel.trim().toLowerCase().replace(/\s+/g, '-'),
//       };
//       setTags([...tags, newTag]);
//       setNewLabel('');
//       setIsAddingNew(false);
//     }
//   };

//   const handleDelete = (valueToDelete: string) => {
//     setTags(tags.filter(tag => tag.value !== valueToDelete));
//   };

//   const handleSaveAll = () => {
//     console.log('Final Tags:', tags);
//   };

//   return (
//     <div className="bg-main p-8 rounded-xl">
//       {/* ট্যাগগুলো */}
//       <div className="flex flex-wrap gap-3 mb-8">
//         {tags.map((tag) => (
//           <div
//             key={tag.value}
//             className="bg-[#E9EFFA] text-title p-2 rounded-xl border-[0.5px] border-heading flex items-center gap-4 group"
//           >
//             <span className="font-medium">{tag.label}</span>
//             <button
//               onClick={() => handleDelete(tag.value)}
//               className="text-gray-500 hover:text-red-600 transition-colors"
//               aria-label="Delete tag"
//             >
//               <X className="w-4 h-4" />
//             </button>
//           </div>
//         ))}

//         {/* নতুন ট্যাগ যোগ করার ইনপুট */}
//         {isAddingNew && (
//           <div className="bg-[#E9EFFA] text-title px-5 py-2 rounded-xl border-[0.5px] border-heading flex items-center">
//             <input
//               type="text"
//               value={newLabel}
//               onChange={(e) => setNewLabel(e.target.value)}
//               onBlur={handleAddNew}
//               onKeyDown={(e) => {
//                 if (e.key === 'Enter') handleAddNew();
//                 if (e.key === 'Escape') {
//                   setNewLabel('');
//                   setIsAddingNew(false);
//                 }
//               }}
//               placeholder="Type here..."
//               autoFocus
//               className="bg-transparent outline-none placeholder:text-title text-title w-32"
//             />
//           </div>
//         )}

//         {/* + বাটন দিয়ে নতুন যোগ করা */}
//         {!isAddingNew && (
//           <button
//             onClick={() => setIsAddingNew(true)}
//             className="font-medium"
//           >
//             <IoIosAddCircleOutline size={35} className='text-common' />
//           </button>
//         )}
//       </div>

//       {/* Save Now বাটন */}
//       <div className="flex justify-center">
//         <button
//           onClick={handleSaveAll}
//           className="bg-common text-main px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
//         >
//           Save Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddTranslation;