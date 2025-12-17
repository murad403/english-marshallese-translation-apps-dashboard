import React from 'react'
import AdminSidebar from '../shared/AdminSidebar'
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar'

const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex justify-start'>
            <SidebarProvider>
                <AdminSidebar></AdminSidebar>
                <main className='w-full p-4 space-y-4'>
                    
                    {children}
                </main>
            </SidebarProvider>
        </div>
    )
}

export default Wrapper
