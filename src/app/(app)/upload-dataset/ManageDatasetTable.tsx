"use client";
import { LiaEditSolid } from "react-icons/lia";
import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';
import ManageDatasetHeader from "./ManageDatasetHeader";
import DatasetDeleteModal from "@/components/modal/DatasetDeleteModal";
import { TDataset } from "@/types/alltypes";
import { useGetTranslationQuery } from "@/redux/features/dataset/dataset.api";

const ManageDatasetTable = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const {data} = useGetTranslationQuery({page: currentPage});
    const totalPages = data?.data?.pagination?.total_pages;


    const handlePreviousPage = () =>{
        if(currentPage !== 1){
            setCurrentPage(currentPage - 1);
        }
    }
    const handleNextPage = () =>{
        if(totalPages !== currentPage){
            setCurrentPage(currentPage + 1)
        }
    }
    return (
        <div className="w-full">
            <div className="overflow-hidden">
                <ManageDatasetHeader></ManageDatasetHeader>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-[#E9EFFA]">
                                <th className="px-6 py-4 text-left md:text-subheading text-normal text-header font-medium">Category</th>
                                <th className="px-6 py-4 text-left md:text-subheading text-normal text-header font-medium">English</th>
                                <th className="px-6 py-4 text-left md:text-subheading text-normal text-header font-medium">Marshallese</th>
                                <th className="px-6 py-4 text-left md:text-subheading text-normal text-header font-medium">Context/Note</th>
                                <th className="px-6 py-4 text-left md:text-subheading text-normal text-header font-medium">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.data?.translations?.map((set: TDataset, index: number) => (
                                <tr
                                    key={set?.id}
                                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                                >
                                    <td className={`px-6 py-5 md:text-normal text-small text-title bg-main ${index === 0 ? "rounded-tl-xl" : ""}`}>{set?.category_details?.name}</td>
                                    <td className="px-6 py-5 md:text-normal text-small text-title bg-main">{set?.english_text}</td>
                                    <td className="px-6 py-5 md:text-normal text-small text-title bg-main">{set?.marshallese_text}</td>
                                    <td className="px-6 py-5 md:text-normal text-small text-title bg-main">{set?.context}</td>
                                    <td className={`px-6 py-5 bg-main ${index === 0 ? "rounded-tr-xl" : ""} md:space-x-5`}>
                                        <button className="text-gray-600 hover:text-common transition-colors">
                                            <Link href={`/upload-dataset/${set?.id}`}>
                                                <LiaEditSolid className="w-5 h-5" />
                                            </Link>
                                        </button>
                                        <button
                                            onClick={() => (document.getElementById('my_modal_3') as HTMLDialogElement).showModal()}
                                            className="text-gray-600 hover:text-red-600 transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                        <DatasetDeleteModal id={set?.id}></DatasetDeleteModal>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 bg-main rounded-b-xl flex items-center justify-between">
                    <div className="text-normal text-title">
                        Page {currentPage} of {totalPages}
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        <button
                            onClick={handleNextPage}
                            disabled={totalPages === currentPage}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageDatasetTable
