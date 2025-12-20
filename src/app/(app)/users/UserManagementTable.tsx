"use client"
import React, { useState } from 'react';
import { Trash2, Search } from 'lucide-react';
import DeleteModal from '@/components/modal/DeleteModal';

interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    joiningDate: string;
    status: 'Active' | 'Inactive';
    subscription: string;
}


const UserManagementTable = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);

    const users = (): User[] => {
        const users: User[] = []
        for (let i = 1; i <= 35; i++) {
            users.push({
                id: `#${12345 + i}`,
                name: "Mr. Jack",
                email: "mrjack123@gmail.com",
                phone: "017762892858",
                joiningDate: "15-10-2025",
                status: "Active",
                subscription: "Regular",
            })
        }
        return users
    }
    const userData = users();

    const usersPerPage = 7;
    const totalPages = Math.ceil(userData.length / usersPerPage)
    const startIndex = (currentPage - 1) * usersPerPage
    const endIndex = startIndex + usersPerPage
    const currentUsers = userData.slice(startIndex, endIndex)

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="w-full">
            <div className="overflow-hidden">
                {/* Search Bar */}
                <div className="p-6 bg-white border-b rounded-xl border-gray-200">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by serial, name or email"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="md:w-1/4 w-full pl-10 pr-4 bg-[#E9EFFA] py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full rounded-xl">
                        <thead>
                            <tr className="bg-[#E9EFFA] *:py-5">
                                <th className="px-6 text-left text-normal md:text-subheading text-header font-medium text-nowrap">User ID</th>
                                <th className="px-6 text-left text-normal md:text-subheading text-header font-medium text-nowrap">User Name</th>
                                <th className="px-6 text-left text-normal md:text-subheading text-header font-medium text-nowrap">User Email</th>
                                <th className="px-6 text-left text-normal md:text-subheading text-header font-medium text-nowrap">User Phone</th>
                                <th className="px-6 text-left text-normal md:text-subheading text-header font-medium text-nowrap">Joining Date</th>
                                <th className="px-6 text-left text-normal md:text-subheading text-header font-medium">Status</th>
                                <th className="px-6 text-left text-normal md:text-subheading text-header font-medium">Subscription</th>
                                <th className="px-6 text-left text-normal md:text-subheading text-header font-medium">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map((user: User, index: number) => (
                                <tr
                                    key={index}
                                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                                >
                                    <td className={`px-6 py-5 md:text-normal text-small text-title bg-main ${index === 0 ? "rounded-tl-xl" : ""}`}>{user.id}</td>
                                    <td className="px-6 py-5 md:text-normal text-small text-title bg-main">{user.name}</td>
                                    <td className="px-6 py-5 md:text-normal text-small text-title bg-main">{user.email}</td>
                                    <td className="px-6 py-5 md:text-normal text-small text-title bg-main">{user.phone}</td>
                                    <td className="px-6 py-5 md:text-normal text-small text-title bg-main pl-10">{user.joiningDate}</td>
                                    <td className="px-6 py-5 bg-main">
                                        <span className="md:text-normal text-small text-title pl-1">{user.status}</span>
                                    </td>
                                    <td className="px-6 py-5 md:text-normal text-small text-title bg-main pl-12">{user.subscription}</td>
                                    <td className={`px-6 py-5 bg-main ${index === 0 ? "rounded-tr-xl" : ""} pl-10`}>
                                        <button
                                            onClick={() =>{ (document.getElementById('my_modal_1') as HTMLDialogElement).showModal()}}
                                            className="text-gray-600 hover:text-red-600 transition-colors"
                                            aria-label="Delete user"
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
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserManagementTable
