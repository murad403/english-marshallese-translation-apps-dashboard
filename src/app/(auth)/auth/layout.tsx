import AuthWrapper from '@/components/wrapper/AuthWrapper'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='w-full bg-[#E9EFFA] min-h-screen flex justify-center items-center px-3 md:px-0'>
            <AuthWrapper>
                {
                    children
                }
            </AuthWrapper>
        </div>
    )
}

export default layout