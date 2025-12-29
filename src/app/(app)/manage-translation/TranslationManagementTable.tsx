"use client";
import { LiaEditSolid } from "react-icons/lia";
import React, { useState } from 'react';
import { Search, Trash2 } from 'lucide-react';
import { format } from "date-fns";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import Link from 'next/link';
import TranslationDeleteModal from "@/components/modal/TranslationDeleteModal";

interface User {
    id: string;
    date: string;
    status: 'Pending' | 'Updated' | 'Active' | 'Inactive';
    category: string;
    english: string;
    marshallese: string;
    contextNote: string;
}

const TranslationManagementTable = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [activeTab, setActiveTab] = useState<'submission' | 'translation'>('submission');
    const [currentPage, setCurrentPage] = useState<number>(1);

    // Date স্টেট এখন Date অবজেক্ট হবে
    const [date, setDate] = useState<Date | undefined>(new Date("2023-02-15")); // ডিফল্ট তারিখ
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const userData: User[] = (() => {
        const users: User[] = [];
        for (let i = 1; i <= 35; i++) {
            users.push({
                id: `${12345 + i}`,
                date: "15-10-2025",
                status: i % 3 === 0 ? "Pending" : "Updated",
                category: "Body Parts",
                english: "Bone",
                marshallese: "Bin",
                contextNote: "Yes",
            });
        }
        return users;
    })();

    const usersPerPage = 7;
    const totalPages = Math.ceil(userData.length / usersPerPage);
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    const currentUsers = userData.slice(startIndex, endIndex);


    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchTerm(e.target.value);
    };
    return (
        <div className="w-full">
            <div className="overflow-hidden">
                {/* Date Picker and Tabs */}
                <div className="p-6 border-b bg-main rounded-xl border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by serial, name or email"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="md:w-2/4 w-full pl-10 pr-4 bg-[#E9EFFA] py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-[1px] focus:ring-common"
                        />
                    </div>

                    <div className="flex md:justify-end justify-center gap-2 w-full">
                        <button
                            onClick={() => setActiveTab('submission')}
                            className={`px-4 py-2 rounded-md md:text-normal text-small font-medium transition-colors ${activeTab === 'submission'
                                ? 'bg-common text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Submission (28)
                        </button>
                        <button
                            onClick={() => setActiveTab('translation')}
                            className={`px-4 py-2 rounded-md md:text-normal text-small font-medium transition-colors ${activeTab === 'translation'
                                ? 'bg-common text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            AI Translation (32)
                        </button>
                    </div>

                </div>

                {/* Table */}
                <div className="overflow-x-auto">
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
                            {currentUsers.map((user, index) => (
                                <tr
                                    key={user.id}
                                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                                >
                                    <td className={`px-6 py-5 md:text-normal text-small text-title bg-main ${index === 0 ? "rounded-tl-xl" : ""}`}>
                                        #{user.id}
                                    </td>
                                    <td className="px-6 py-5 md:text-normal text-small text-title bg-main text-nowrap">{user.date}</td>
                                    <td className="px-6 py-5 md:text-normal text-small text-title bg-main">
                                        <span className={`${user.status === 'Pending' ? 'text-[#B35006]' : 'text-[#0C9721]'
                                            }`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 md:text-normal text-small text-title bg-main">{user.category}</td>
                                    <td className="px-6 py-5 md:text-normal text-small text-title bg-main pl-8">{user.english}</td>
                                    <td className="px-6 py-5 md:text-normal text-small text-title bg-main pl-16">{user.marshallese}</td>
                                    <td className="px-6 py-5 md:text-normal text-small text-title bg-main pl-18">{user.contextNote}</td>
                                    <td className={`px-6 py-5 bg-main ${index === 0 ? "rounded-tr-xl" : ""} md:space-x-5`}>
                                        <button className="text-gray-600 hover:text-common transition-colors">
                                            <Link href={`/manage-translation/${user.id}`}>
                                                <LiaEditSolid className="w-5 h-5" />
                                            </Link>
                                        </button>
                                        <button
                                            onClick={() => (document.getElementById('my_modal_4') as HTMLDialogElement).showModal()}
                                            className="text-gray-600 hover:text-red-600 transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                        <TranslationDeleteModal id={2}></TranslationDeleteModal>
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
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TranslationManagementTable;