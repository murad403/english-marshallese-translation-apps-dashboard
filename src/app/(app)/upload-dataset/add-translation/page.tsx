import AdminHeader from '@/components/shared/AdminHeader'
import React from 'react'
import AddTranslationHeader from './AddTranslationHeader'

const page = () => {
    return (
        <div className='space-y-4'>
            <AdminHeader title='Add New Translation' isShowBackButton></AdminHeader>
            <AddTranslationHeader></AddTranslationHeader>
            {/* <AddTranslation></AddTranslation> */}
        </div>
    )
}

export default page
