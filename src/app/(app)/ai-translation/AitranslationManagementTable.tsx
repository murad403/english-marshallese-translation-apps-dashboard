"use client";
import { LiaEditSolid } from "react-icons/lia";
import React, { useState } from 'react';
import { Search, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { TTranslation } from "@/types/alltypes";
import { useGetAiTranslationQuery, useGetSubmissionQuery } from "@/redux/features/translation/translation.api";
import AiTranslationDeleteModal from "@/components/modal/AitranslationDeleteModal";

const AiTranslationManagementTable = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { data } = useGetSubmissionQuery({ page: currentPage, search: searchTerm });
    const { data: aiTranslationData, isLoading: aiTranslationLoading } = useGetAiTranslationQuery({ page: currentPage, search: searchTerm });
    // console.log(aiTranslationData?.data?.feedback_items);

    const [activeTab, setActiveTab] = useState<'submission' | 'translation'>('translation');


    const translationData = aiTranslationData?.data?.feedback_items;
    // console.log(translationData)

    const totalPages = Math.ceil(aiTranslationData?.data?.total / aiTranslationData?.data?.limit);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchTerm(e.target.value);
    };
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
                {/* Date Picker and Tabs */}
                <div className="p-6 border-b bg-main rounded-xl border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by english text"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="md:w-2/4 w-full pl-10 pr-4 bg-[#E9EFFA] py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-[1px] focus:ring-common"
                        />
                    </div>

                    <div className="flex md:justify-end justify-center gap-2 w-full">
                        <Link href={"/manage-translation"}
                            onClick={() => setActiveTab('submission')}
                            className={`px-4 py-2 rounded-md md:text-normal text-small font-medium transition-colors ${activeTab === 'submission'
                                ? 'bg-common text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Submission ({data?.data?.total})
                        </Link>
                        <Link href={"/ai-translation"}
                            onClick={() => setActiveTab('translation')}
                            className={`px-4 py-2 rounded-md md:text-normal text-small font-medium transition-colors ${activeTab === 'translation'
                                ? 'bg-common text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            AI Translation ({aiTranslationData?.data?.total})
                        </Link>
                    </div>

                </div>


                {
                    aiTranslationLoading ? <div className="flex justify-center items-center h-full mt-10">
                        <p className="text-sm sm:text-base text-gray-500">Loading...</p>
                    </div> :
                        <div>
                            {
                                data ? <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-[#E9EFFA]">
                                                <th className="px-6 py-4 text-left text-normal md:text-subheading text-header font-medium text-nowrap">User ID</th>
                                                <th className="px-6 py-4 text-left text-normal md:text-subheading text-header font-medium">Date</th>
                                                <th className="px-6 py-4 text-left text-normal md:text-subheading text-header font-medium">Status</th>
                                                <th className="px-6 py-4 text-left text-normal md:text-subheading text-header font-medium">Category</th>
                                                <th className="px-6 py-4 text-left text-normal md:text-subheading text-header font-medium">English</th>
                                                <th className="px-6 py-4 text-left text-normal md:text-subheading text-header font-medium">Marshallese</th>
                                                <th className="px-6 py-4 text-left text-normal md:text-subheading text-header font-medium">Context/Note</th>
                                                <th className="px-6 py-4 text-left text-normal md:text-subheading text-header font-medium">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {translationData?.map((item: TTranslation, index: number) => (
                                                <tr
                                                    key={item.id}
                                                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                                                >
                                                    <td className={`px-6 py-5 md:text-normal text-small text-title bg-main pl-8 ${index === 0 ? "rounded-tl-xl" : ""}`}>
                                                        #{item.id}
                                                    </td>
                                                    <td className="px-6 py-5 md:text-normal text-small text-title bg-main text-nowrap">{item?.created_date}</td>
                                                    <td className="px-6 py-5 md:text-normal text-small text-title bg-main">
                                                        <span className={`${item?.status == 'pending' ? 'text-[#B35006]' : 'text-[#0C9721]'
                                                            }`}>
                                                            {item?.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-5 md:text-normal text-small text-title bg-main">{item?.category_details?.name}</td>
                                                    <td className="px-6 py-5 md:text-normal text-small text-title bg-main">{item?.source_text}</td>
                                                    <td className="px-6 py-5 md:text-normal text-small text-title bg-main">{item?.known_translation}</td>
                                                    <td className="px-6 py-5 md:text-normal text-small text-title bg-main">{item?.notes}</td>
                                                    <td className={`pl-7 py-5 bg-main ${index === 0 ? "rounded-tr-xl" : ""} md:space-x-3`}>
                                                        <button className="text-gray-600 hover:text-common transition-colors">
                                                            <Link href={`/ai-translation/${item.id}`}>
                                                                <LiaEditSolid className="w-5 h-5" />
                                                            </Link>
                                                        </button>
                                                        <button
                                                            onClick={() => (document.getElementById('my_modal_5') as HTMLDialogElement).showModal()}
                                                            className="text-gray-600 hover:text-red-600 transition-colors"
                                                        >
                                                            <Trash2 className="w-5 h-5" />
                                                        </button>
                                                        <AiTranslationDeleteModal id={item?.id}></AiTranslationDeleteModal>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div> : <p className="text-sm sm:text-base text-gray-500 text-center">No data found</p>
                            }


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
                                        disabled={totalPages == currentPage}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}

export default AiTranslationManagementTable
