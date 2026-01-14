
import { IconType } from "react-icons";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { TfiWorld } from "react-icons/tfi";
import { VscFolder } from "react-icons/vsc";

export type TLink = {
    id: number;
    title: string;
    route: string;
    icon: IconType;
}

export const sidebarLinks: TLink[] = [
    {id: 1, title: "dashboard", route: "/", icon: MdOutlineDashboard},
    {id: 2, title: "users", route: "/users", icon: FaUsers },
    {id: 3, title: "manage translation", route: "/ai-translation", icon: TfiWorld},
    {id: 4, title: "Upload Dataset", route: "/upload-dataset", icon: VscFolder},
    {id: 5, title: "Notification", route: "/notification", icon: IoNotificationsOutline},
    {id: 6, title: "Settings", route: "/settings", icon: IoSettingsOutline},
]