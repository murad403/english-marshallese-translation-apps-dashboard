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
    const { data, isLoading } = useGetTranslationQuery({ page: currentPage });
    const totalPages = data?.data?.pagination?.total_pages;


    const handlePreviousPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }
    const handleNextPage = () => {
        if (totalPages !== currentPage) {
            setCurrentPage(currentPage + 1)
        }
    }
    return (
        <div className="w-full">
            <div className="overflow-hidden">
                <ManageDatasetHeader></ManageDatasetHeader>


                {
                    isLoading ? <div className="flex justify-center items-center h-full mt-10">
                        <p className="text-sm sm:text-base text-gray-500">Loading...</p>
                    </div> : <div>
                        {
                            data?.data?.translations?.length > 0 ? 
                            <div>
                                <div className="overflow-x-auto">
                                    <table className="w-full rounded-xl">
                                        <thead>
                                            <tr className="bg-[#E9EFFA] *:py-5">
                                                <th className="px-6 text-left md:text-subheading text-normal text-header font-medium">Category</th>
                                                <th className="px-6 text-left md:text-subheading text-normal text-header font-medium">English</th>
                                                <th className="px-6 text-left md:text-subheading text-normal text-header font-medium">Marshallese</th>
                                                <th className="px-6 text-left md:text-subheading text-normal text-header font-medium">Context/Note</th>
                                                <th className="px-6 text-left md:text-subheading text-normal text-header font-medium">Action</th>
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
                                                    <td className={`pl-7 py-5 bg-main ${index === 0 ? "rounded-tr-xl" : ""} md:space-x-3`}>
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
                                <div className="px-6 py-4 bg-main rounded-b-xl flex items-center justify-between">
                                    <div className="text-normal text-title">
                                        Page {currentPage} of {totalPages}
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handlePreviousPage}
                                            disabled={currentPage === 1}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            Previous
                                        </button>
                                        <button
                                            onClick={handleNextPage}
                                            disabled={totalPages === currentPage}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                            : <div className="flex flex-col items-center justify-center py-16 px-6">
                                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 mb-6 flex items-center justify-center">
                                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-title mb-2">
                                    No datasets yet
                                </h3>
                                <p className="text-sm text-muted-foreground text-center max-w-md">
                                    There are currently no datasets in the system. Datasets will appear here once they are uploaded.
                                </p>
                            </div>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default ManageDatasetTable