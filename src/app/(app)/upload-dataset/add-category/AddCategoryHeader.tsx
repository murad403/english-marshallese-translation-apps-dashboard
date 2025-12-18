import Link from 'next/link'
import React from 'react'
import { IoIosAddCircleOutline } from 'react-icons/io'

const AddCategoryHeader = () => {
    return (
        <div className="p-6 border-b bg-main rounded-xl border-gray-200">
            <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
                <h3 className='text-normal font-medium'>Category (50)</h3>
                <div className="flex items-center gap-4 text-normal font-medium">
                    <h3>Translation (1050)</h3>
                    <button className="rounded-lg hover:text-common transition-colors duration-300">
                        <Link href={'/upload-dataset/add-translation'}>
                            <IoIosAddCircleOutline size={30}/>
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddCategoryHeader
