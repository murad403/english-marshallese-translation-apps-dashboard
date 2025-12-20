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
                {/* Date Picker and Tabs */}
                <div className="p-6 border-b bg-main rounded-xl border-gray-200">
                    <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="text-normal font-medium text-title">
                                {/* তারিখ দেখানোর জন্য format করা */}
                                {date ? format(date, "dd-MM-yy") : "Pick a date"}
                            </span>

                            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                                <PopoverTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <CalendarIcon className="h-4 w-4" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={(newDate) => {
                                            setDate(newDate); // newDate হবে Date | undefined
                                            setIsCalendarOpen(false);
                                        }}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => setActiveTab('submission')}
                                className={`px-4 py-2 rounded-md text-normal font-medium transition-colors ${
                                    activeTab === 'submission'
                                        ? 'bg-common text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                Submission (28)
                            </button>
                            <button
                                onClick={() => setActiveTab('translation')}
                                className={`px-4 py-2 rounded-md text-normal font-medium transition-colors ${
                                    activeTab === 'translation'
                                        ? 'bg-common text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                AI Translation (32)
                            </button>
                        </div>
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
                                        <span className={`${
                                            user.status === 'Pending' ? 'text-[#B35006]' : 'text-[#0C9721]'
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
                                            <LiaEditSolid className="w-5 h-5"/>
                                            </Link>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="text-gray-600 hover:text-red-600 transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
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