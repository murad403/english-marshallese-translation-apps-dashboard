/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Trash2 } from "lucide-react"
import { useDeleteRecentActivityMutation, useRecentActivityQuery } from "@/redux/features/dashboard/dashboard.api"
import { TActivity } from "@/types/alltypes"
import { toast } from "react-toastify"


const RecentActivityTable = () => {
    const { data } = useRecentActivityQuery(undefined);
    const [deleteRecentActivity] = useDeleteRecentActivityMutation();

    const handleDelete = async(id: number) => {
        try {
            const result = await deleteRecentActivity(id).unwrap();
            toast.success(result?.message);
        } catch (error: any) {
            console.log(error?.data);

        }
    }

    return (
        <div className="w-full rounded-lg bg-white px-4 sm:px-6 h-175 overflow-y-auto relative">
            {/* Header */}
            <div className="w-full bg-main sticky top-0">
                <div className="py-5 flex items-center justify-between border-b border-[#BCCCEE]">
                    <h2 className="text-subheading font-semibold text-header">Recent Activity</h2>
                </div>
            </div>

            {/* Activity List - This will scroll */}
            <div className="space-y-3 mt-3">
                {
                    data?.data?.map((activity: TActivity) => (
                        <div className={`flex items-center justify-between rounded-lg border p-4`} key={activity.id}>
                            <div>
                                <p className="text-sm text-header">{activity?.time_ago}</p>
                                <p className="text-sm text-header">
                                    {activity?.user_name} {activity?.activity_type_display}
                                </p>
                            </div>
                            <button  onClick={() => handleDelete(activity.id)}> 
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default RecentActivityTable