"use client"
import logo from "@/assets/logo.jpg";

import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup,
  SidebarGroupContent, SidebarGroupLabel, SidebarMenu,
  SidebarMenuButton, SidebarMenuItem, SidebarTrigger
} from "@/components/ui/sidebar"
import Image from "next/image"
import { sidebarLinks, TLink } from "@/lib/sidebarLinks";
import { usePathname } from "next/navigation";
import { CgLogOut } from "react-icons/cg";
import LogoutModal from "../modal/LogoutModal";
import Link from "next/link";

const AdminSidebar = () => {
  const pathName = usePathname();

  return (
    <div>
      <Sidebar className="border-none" collapsible="icon">
        <SidebarContent className="py-6">
          <SidebarGroup className="flex flex-col h-full p-0 justify-between">

            <div>
              {/* ── Header row ── 
                  Expanded : [Logo]         [Trigger →]
                  Collapsed: [small logo]   [Trigger →]
                  The trigger is always absolutely positioned to the right edge
              */}
              <div className="relative flex items-center px-4 mb-6 h-12">

                {/* Full logo — hidden in icon/collapsed mode */}
                <Link href="/" className="group-data-[collapsible=icon]:hidden">
                  <Image src={logo} alt="logo" width={110} height={50} />
                </Link>

                {/* Small logo — shown only in icon/collapsed mode */}
                <Link
                  href="/"
                  className="hidden group-data-[collapsible=icon]:flex items-center justify-center w-full"
                >
                  <Image
                    src={logo}
                    alt="logo"
                    width={32}
                    height={32}
                    className="rounded-md object-cover"
                  />
                </Link>

                {/* Trigger — always pinned to the right, on top of logo row */}
                <div className="absolute right-1 top-7 -translate-y-1/2">
                  <SidebarTrigger className="h-fit" />
                </div>
              </div>

              {/* Nav links */}
              <SidebarGroupContent>
                <SidebarMenu className="px-4 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:items-center mt-16">
                  {sidebarLinks.map((item: TLink) => {
                    let isActive =
                      item.route === "/"
                        ? pathName === item.route
                        : pathName.startsWith(item.route);

                    if (
                      item.title === "manage translation" &&
                      (pathName.startsWith("/manage-translation") ||
                        pathName.startsWith("/ai-translation"))
                    ) {
                      isActive = true;
                    }

                    if (
                      item.title === "Upload Dataset" &&
                      pathName.startsWith("/upload-dataset")
                    ) {
                      isActive = true;
                    }

                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          tooltip={item.title}
                          isActive={isActive}
                          className={`
                            text-normal capitalize
                            group-data-[collapsible=icon]:justify-center
                            group-data-[collapsible=icon]:w-10
                            group-data-[collapsible=icon]:h-10
                            group-data-[collapsible=icon]:mx-auto
                            ${isActive ? "bg-common text-main hover:bg-common hover:text-main" : ""}
                          `}
                          asChild
                        >
                          <a href={item.route} className="flex items-center gap-2">
                            <item.icon size={24} />
                            <span className="group-data-[collapsible=icon]:hidden">
                              {item.title}
                            </span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </div>

            {/* Footer: logout */}
            <SidebarFooter className="flex justify-start w-full px-5 mt-10 group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:items-center">
              <button
                onClick={() =>
                  (document.getElementById("my_modal_2") as HTMLDialogElement).showModal()
                }
                className="flex items-center gap-4 text-normal bg-slate-100 py-2 px-2 rounded-lg group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:justify-center"
              >
                <CgLogOut className="text-common" size={24} />
                <span className="group-data-[collapsible=icon]:hidden">Log Out</span>
              </button>
              <LogoutModal />
            </SidebarFooter>

          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
};

export default AdminSidebar;