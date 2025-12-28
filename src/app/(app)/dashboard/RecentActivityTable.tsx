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
        <div className="w-full rounded-lg bg-white p-4 sm:p-6 h-175 flex flex-col">
            {/* Header */}
            <div className="mb-6 pb-5 flex items-center justify-between border-b border-[#BCCCEE] flex-shrink-0">
                <h2 className="text-normal font-semibold text-header">Recent Activity</h2>
            </div>

            {/* Activity List - This will scroll */}
            <div className="flex-1 overflow-y-auto min-h-0">
                <div className="space-y-3">
                    {data?.data?.map((activity: TActivity) => (
                        <div
                            key={activity.id}
                            className={`flex items-center justify-between rounded-lg border p-4`}
                        >
                            <div className="flex-1">
                                <p className="text-sm text-gray-600">{activity?.time_ago}</p>
                                <p className="text-sm text-gray-900">
                                    {activity?.user_name} {activity?.activity_type_display}
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDelete(activity.id)}
                                    className="h-8 w-8 text-gray-500 hover:text-gray-900"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Delete activity</span>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RecentActivityTable