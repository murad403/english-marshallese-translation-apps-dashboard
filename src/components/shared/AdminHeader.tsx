"use client"
import Image from 'next/image'
import profile from "@/assets/admin.png";
import { SidebarTrigger } from '../ui/sidebar';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { useGetProfileQuery } from '@/redux/features/setting/setting.api';
import Link from 'next/link';
import { IoNotificationsOutline } from 'react-icons/io5';
import { useNotificationQuery } from '@/redux/features/notification/notification.api';

const AdminHeader = ({ title, isShowBackButton = false }: { title?: string, isShowBackButton?: boolean }) => {
    const { data } = useGetProfileQuery(undefined);
    const {data: notification} = useNotificationQuery(undefined);

    //  console.log(notification?.data?.total)
    const router = useRouter();
    return (
        <div>
            <div className='flex justify-between items-center p-5 bg-main py-5 rounded-xl'>
                <div className='flex items-center gap-3'>
                    {
                        isShowBackButton &&
                        <button onClick={() => router.back()}>
                            <MdOutlineKeyboardBackspace size={30} />
                        </button>
                    }
                    <div>
                        {
                            title ?
                                <h1 className='font-medium text-title md:text-heading text-subheading capitalize'>{title}</h1>
                                :
                                <div>
                                    <p className='text-title text-normal'>Welcome</p>
                                    <h1 className='font-medium text-title md:text-heading text-subheading capitalize'>{data?.data?.user_profile?.full_name}</h1>
                                </div>

                        }
                    </div>
                </div>
                <div className='flex items-center gap-4'>
                    <Link href={"/notification"} className='relative group'>
                        <IoNotificationsOutline size={37} />
                        {/* Notification Badge */}
                        <span className='absolute -top-px right-0.5 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center'>
                            {notification?.data?.total}
                        </span>
                        {/* Tooltip */}
                        <span className='absolute -bottom-12 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50'>
                            {notification?.data?.total} {`translation's`} need review
                            {/* Arrow */}
                            <span className='absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45'></span>
                        </span>
                    </Link>
                    <Link href={"/settings"}>
                        <Image src={data?.data?.user_profile?.profile_picture || profile} alt='admin' width={500} height={500} className='md:size-14 size-10 rounded-full' />
                    </Link>
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
