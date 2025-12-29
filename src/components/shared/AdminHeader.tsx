"use client"
import Image from 'next/image'
import profile from "@/assets/admin.png";
import { SidebarTrigger } from '../ui/sidebar';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { useRouter } from 'next/navigation';

const AdminHeader = ({ title, isShowBackButton = false }: { title: string, isShowBackButton?: boolean }) => {
    const router = useRouter();
    return (
        <div>
            <div className='flex justify-between items-center p-5 bg-main py-5 rounded-xl'>
                <div className='flex items-center gap-3'>
                    { 
                        isShowBackButton &&
                        <button onClick={() => router.back()}>
                            <MdOutlineKeyboardBackspace size={30}/>
                        </button>
                    }
                    <h1 className='font-medium text-title md:text-heading text-subheading capitalize'>{title}</h1>
                </div>
                <div>
                    <Image src={profile} alt='admin' width={500} height={500} className='md:size-14 size-10' />
                </div>
            </div>
            <div className='md:hidden flex justify-start items-center mt-4 w-full'>
                <div className='flex justify-start'>
                    <SidebarTrigger />
                </div>
            </div>
        </div>
    )
}

export default AdminHeader
