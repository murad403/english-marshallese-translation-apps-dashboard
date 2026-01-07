"use client"
import React, { useState } from 'react';
import { Trash2, Search } from 'lucide-react';
import { TUser } from '@/types/alltypes';
import { useGetUsersQuery } from '@/redux/features/user/user.api';
import UserDeleteModal from '@/components/modal/UserDeleteModal';


const UserManagementTable = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);

    const { data, isLoading } = useGetUsersQuery({ page: currentPage, search: searchTerm });
    // console.log(data?.data?.page);

    const totalPages = Math.ceil(data?.data?.total / data?.data?.limit);
    // console.log(totalPages);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
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
                {/* Search Bar */}
                <div className="p-6 bg-white border-b rounded-xl border-gray-200">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by name or email"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="md:w-1/4 w-full pl-10 pr-4 bg-[#E9EFFA] py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-[1px] focus:ring-common"
                        />
                    </div>
                </div>

                {
                    isLoading ? <div className="flex justify-center items-center h-full mt-10">
                        <p className="text-sm sm:text-base text-gray-500">Loading...</p>
                    </div> :

                        <div>
                            {
                                data?.data?.users?.length > 0 ?
                                    <div>
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
                                                    {data?.data?.users.map((user: TUser, index: number) => (
                                                        <tr
                                                            key={user?.id}
                                                            className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                                                        >
                                                            <td className={`px-6 py-5 md:text-normal text-small text-title bg-main pl-10 ${index === 0 ? "rounded-tl-xl" : ""}`}>{user.user_id}</td>
                                                            <td className="px-6 py-5 md:text-normal text-small text-title bg-main">{user?.user_name}</td>
                                                            <td className="px-6 py-5 md:text-normal text-small text-title bg-main">{user?.user_email}</td>
                                                            <td className="px-6 py-5 md:text-normal text-small text-title bg-main">{user?.user_phone}</td>
                                                            <td className="px-6 py-5 md:text-normal text-small text-title bg-main pl-10">{user?.joining_date}</td>
                                                            <td className="px-6 py-5 bg-main">
                                                                <span className="md:text-normal text-small text-title pl-1">{user?.status}</span>
                                                            </td>
                                                            <td className="px-6 py-5 md:text-normal text-small text-title bg-main pl-12">{user?.subscription}</td>
                                                            <td className={`px-6 py-5 bg-main ${index === 0 ? "rounded-tr-xl" : ""} pl-10`}>
                                                                <button
                                                                    onClick={() => { (document.getElementById('my_modal_1') as HTMLDialogElement).showModal() }}
                                                                    className="text-gray-600 hover:text-red-600 transition-colors"
                                                                    aria-label="Delete user"
                                                                >
                                                                    <Trash2 className="w-5 h-5" />
                                                                </button>
                                                                <UserDeleteModal id={user.id}></UserDeleteModal>
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
                                                    disabled={totalPages == currentPage}
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
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-semibold text-title mb-2">
                                            {searchTerm ? "No users found" : "No users yet"}
                                        </h3>
                                        <p className="text-sm text-muted-foreground text-center max-w-md">
                                            {searchTerm
                                                ? `We couldn't find any users matching "${searchTerm}". Try a different search term.`
                                                : "There are currently no users in the system. Users will appear here once they register."
                                            }
                                        </p>
                                    </div>
                            }


                        </div>
                }
            </div>
        </div >
    );
}

export default UserManagementTable
