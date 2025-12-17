import Image from 'next/image'
import Link from 'next/link'
import { IoMdNotificationsOutline } from 'react-icons/io'
import profile from "@/assets/admin.png";
import { SidebarTrigger } from '../ui/sidebar';

const AdminHeader = ({title}: {title: string}) => {
    return (
        <div className='flex justify-between items-center p-5 bg-main py-8 rounded-xl'>
            <div className='flex items-center gap-2'>
                <div className='md:hidden block mt-1'>
                    <SidebarTrigger></SidebarTrigger>
                </div>
                <h1 className='font-medium text-title md:text-heading text-subheading capitalize'>{title}</h1>
            </div>
            <div className='flex items-center gap-5'>
                <Link className='md:text-[30px] text-[25px]'  href={'/notification'}>
                    <IoMdNotificationsOutline />
                </Link>
                <Image src={profile} alt='admin' width={500} height={500} className='md:size-14 size-10'/>
            </div>
        </div>
    )
}

export default AdminHeader
