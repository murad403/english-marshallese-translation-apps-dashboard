"use client"
import { settingsLinks, TSettingLink } from '@/lib/settingsLinks'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IoMdArrowForward } from 'react-icons/io'

const AdminSettingsbar = () => {
    const pathName = usePathname();
    return (
        <div className='w-full md:w-1/2'>
            <ul className='w-full md:w-1/2 space-y-5'>
                {
                    settingsLinks.map((link: TSettingLink) =>
                        <li key={link.id}>
                            <Link href={link.route} className={`flex justify-between text-normal md:text-subheading items-center capitalize ${pathName === link.route ? "text-common" : "text-title"}`}>
                                {link.label}
                                <IoMdArrowForward />
                            </Link>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}

export default AdminSettingsbar
