"use client";
import { LiaEditSolid } from "react-icons/lia";
import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
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
import ManageDatasetHeader from "./ManageDatasetHeader";
import DeleteModal from "@/components/modal/DeleteModal";

interface User {
    id: string;
    date: string;
    status: 'Pending' | 'Updated' | 'Active' | 'Inactive';
    category: string;
    english: string;
    marshallese: string;
    contextNote: string;
}

const ManageDatasetTable = () => {
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

    const handleDelete = (userId: string): void => {
        console.log(`Delete user: ${userId}`);
    };
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
                            {currentUsers.map((user, index) => (
                                <tr
                                    key={user.id}
                                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                                >
                                    <td className={`px-6 py-5 md:text-normal text-small text-title bg-main ${index === 0 ? "rounded-tl-xl" : ""}`}>{user.category}</td>
                                    <td className="px-6 py-5 md:text-normal text-small text-title bg-main pl-10">{user.english}</td>
                                    <td className="px-6 py-5 md:text-normal text-small text-title bg-main pl-18">{user.marshallese}</td>
                                    <td className="px-6 py-5 md:text-normal text-small text-title bg-main pl-20">{user.contextNote}</td>
                                    <td className={`px-6 py-5 bg-main ${index === 0 ? "rounded-tr-xl" : ""} md:space-x-5`}>
                                        <button className="text-gray-600 hover:text-common transition-colors">
                                            <Link href={`/upload-dataset/${user.id}`}>
                                                <LiaEditSolid className="w-5 h-5" />
                                            </Link>
                                        </button>
                                        <button
                                            onClick={() => (document.getElementById('my_modal_1') as HTMLDialogElement).showModal()}
                                            className="text-gray-600 hover:text-red-600 transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                        <DeleteModal id={user.id}></DeleteModal>
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
    )
}

export default ManageDatasetTable
