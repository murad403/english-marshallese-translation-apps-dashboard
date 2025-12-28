import AdminHeader from '@/components/shared/AdminHeader'
import AdminSettingsbar from '@/components/shared/AdminSettingsbar'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='space-y-4'>
            <AdminHeader title='Settings'></AdminHeader>
            <main className='bg-main p-5 md:p-10 rounded-xl flex flex-col md:flex-row md:justify-between md:gap-8 gap-4 h-200'>
                <AdminSettingsbar></AdminSettingsbar>
                <div className="divider md:divider-horizontal divider-info"></div>
                <div className='w-full md:w-1/2'>
                    {children}
                </div>
            </main>
        </div>
    )
}

export default layout
