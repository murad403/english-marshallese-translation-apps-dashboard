import Link from 'next/link'
import React from 'react'

const ManageDatasetHeader = () => {
  return (
    <div className="p-6 border-b bg-main rounded-xl border-gray-200">
                    <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
                        <div className="flex items-center gap-4 text-normal font-medium">
                            <h3>Translation (1050)</h3>
                            <button className="py-2 bg-[#E9EFFA] px-4 rounded-lg hover:bg-common hover:text-main transition-colors duration-300">
                                <Link href={'/'}>
                                    Add New
                                </Link>
                            </button>
                        </div>
                        <div className="flex items-center gap-4 text-normal font-medium">
                            <h3>Category (50)</h3>
                            <button className="py-2 bg-[#E9EFFA] px-4 rounded-lg hover:bg-common hover:text-main transition-colors duration-300">
                                <Link href={'/'}>
                                    Add New
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
  )
}

export default ManageDatasetHeader
