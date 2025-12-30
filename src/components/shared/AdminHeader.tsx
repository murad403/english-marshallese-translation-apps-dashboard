"use client"
import Image from 'next/image'
import profile from "@/assets/admin.png";
import { SidebarTrigger } from '../ui/sidebar';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { useGetProfileQuery } from '@/redux/features/setting/setting.api';

const AdminHeader = ({ title, isShowBackButton = false }: { title: string, isShowBackButton?: boolean }) => {
     const { data } = useGetProfileQuery(undefined);
    //  console.log(data)
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
                    <h1 className='font-medium text-title md:text-heading text-subheading capitalize'>{data?.data?.user_profile?.full_name}</h1>
                </div>
                <div>
                    <Image src={data?.data?.user_profile?.profile_picture || profile} alt='admin' width={500} height={500} className='md:size-14 size-10 rounded-full' />
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
