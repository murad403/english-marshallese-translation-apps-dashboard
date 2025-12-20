import Link from 'next/link'
import React from 'react'

const ManageDatasetHeader = () => {
    return (
        <div className="p-6 border-b bg-main rounded-xl border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <h3 className="text-normal font-medium">Translation (1050)</h3>
                    <button className="py-2 bg-[#E9EFFA] px-4 rounded-lg hover:bg-common hover:text-main transition-colors duration-300">
                        <Link href="/upload-dataset/add-translation">
                            Add New
                        </Link>
                    </button>
                </div>

                <div className='md:flex justify-end'>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h3 className="text-normal font-medium">Category (50)</h3>
                    <button className="py-2 bg-[#E9EFFA] px-4 rounded-lg hover:bg-common hover:text-main transition-colors duration-300">
                        <Link href="/upload-dataset/add-category">
                            Add New
                        </Link>
                    </button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default ManageDatasetHeader