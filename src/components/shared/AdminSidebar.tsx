"use client"
import logo from "@/assets/logo.jpg";

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem} from "@/components/ui/sidebar"
import Image from "next/image"
import { sidebarLinks, TLink } from "@/lib/sidebarLinks";
import { usePathname } from "next/navigation";
import { CgLogOut } from "react-icons/cg";
import LogoutModal from "../modal/LogoutModal";


const AdminSidebar = () => {
  const pathName = usePathname();
  return (
    <div>
      <Sidebar className="border-none">
        <SidebarContent className="py-10">
          <SidebarGroup className="flex justify-between flex-col h-full">
            <div>
              <SidebarGroupLabel className="mb-5 flex justify-center items-center">
                <Image src={logo} alt="logo" width={110} height={70} />
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="px-4">
                  {sidebarLinks.map((item: TLink) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton className={`text-normal ${pathName === item.route ? "bg-common text-main hover:bg-common hover:text-main" : ""} capitalize`} asChild>
                        <a href={item.route}>
                          <item.icon/>
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </div>
            <SidebarFooter className="flex justify-start w-full px-5 mt-10">
              <button onClick={() => (document.getElementById('my_modal_2') as HTMLDialogElement).showModal()} className="flex items-center gap-4 text-normal bg-slate-100 py-2 px-2 rounded-lg ">
                <CgLogOut className="text-common" size={25}/>
                <span>Log Out</span>
              </button>
              <LogoutModal></LogoutModal>
            </SidebarFooter>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  )
}

export default AdminSidebar
