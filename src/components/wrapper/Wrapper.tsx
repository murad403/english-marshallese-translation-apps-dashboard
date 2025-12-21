"use client"
import React from 'react'
import AdminSidebar from '../shared/AdminSidebar'
import { SidebarProvider } from '../ui/sidebar'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'

const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <SidebarProvider className='flex justify-start'>
                <AdminSidebar></AdminSidebar>
                <main className='w-full p-4 space-y-4'>
                    {children}
                </main>
            </SidebarProvider>
        </Provider>
    )
}

export default Wrapper
