"use client"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRecentActivityQuery } from "@/redux/features/dashboard/dashboard.api"
import { TActivity } from "@/types/alltypes"


const RecentActivityTable = () => {
    const { data } = useRecentActivityQuery(undefined);

    const handleDelete = (id: number) => {
        console.log(id)
    }

    return (
        <div className="w-full h-175 bg-main py-6 rounded-xl">
            <div className="px-5 pb-5 flex items-center justify-between border-b border-[#BCCCEE]">
                <h2 className="text-subheading font-semibold text-header">Recent Activity</h2>
            </div>
        </div>
        // <div className="w-full rounded-lg bg-white p-4 sm:p-6 h-175">
        //     {/* Header */}
        //     

        //     {/* Activity List - This will scroll */}
        //     <div className="h-full overflow-y-scroll">
        //         <div className="space-y-3">
        //             {data?.data?.map((activity: TActivity) => (
        //                 <div
        //                     key={activity.id}
        //                     className={`flex items-center justify-between rounded-lg border p-4`}
        //                 >
        //                     <div className="flex-1">
        //                         <p className="text-sm text-gray-600">{activity?.time_ago}</p>
        //                         <p className="text-sm text-gray-900">
        //                             {activity?.user_name} {activity?.activity_type_display}
        //                         </p>
        //                     </div>

        //                     <div className="flex items-center gap-3">
        //                         <Button
        //                             variant="ghost"
        //                             size="icon"
        //                             onClick={() => handleDelete(activity.id)}
        //                             className="h-8 w-8 text-gray-500 hover:text-gray-900"
        //                         >
        //                             <Trash2 className="h-4 w-4" />
        //                             <span className="sr-only">Delete activity</span>
        //                         </Button>
        //                     </div>
        //                 </div>
        //             ))}
        //         </div>
        //     </div>
        // </div>
    )
}

export default RecentActivityTable