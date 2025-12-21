"use client"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

type Activity = {
    id: string;
    user: string;
    action: string;
    time: string;
    isRead: boolean;
}

const RecentActivityTable = () => {
    const [activities, setActivities] = useState<Activity[]>([
        { id: "1", user: "John Doe", action: "registered", time: "5 mnite ago", isRead: false },
        { id: "2", user: "John Doe", action: "registered", time: "5 mnite ago", isRead: true },
        { id: "3", user: "John Doe", action: "registered", time: "5 mnite ago", isRead: true },
        { id: "4", user: "John Doe", action: "registered", time: "5 mnite ago", isRead: true },
        { id: "5", user: "John Doe", action: "registered", time: "5 mnite ago", isRead: true },
    ])

    const handleDelete = (id: string) => {
        setActivities(activities.filter((activity) => activity.id !== id))
    }

    const handleSellAll = () => {
        setActivities([])
    }

    return (
        <div className="w-full rounded-lg bg-white p-4 sm:p-6">
            {/* Header */}
            <div className="mb-6 pb-5 flex items-center justify-between border-b border-[#BCCCEE]">
                <h2 className="text-normal font-semibold text-header">Recent Activity</h2>
                <Button
                    variant="ghost"
                    onClick={handleSellAll}
                    className="h-auto p-0 text-sm font-normal text-gray-900 hover:bg-transparent hover:text-gray-700"
                >
                    Sell All
                </Button>
            </div>

            {/* Activity List */}
            <div className="space-y-3">
                {activities.map((activity) => (
                    <div
                        key={activity.id}
                        className={`flex items-center justify-between rounded-lg border p-4 ${activity.isRead ? "border-gray-200 bg-white" : "border-red-100 bg-red-50"
                            }`}
                    >
                        <div className="flex-1">
                            <p className="text-sm text-gray-600">{activity.time}</p>
                            <p className="text-sm text-gray-900">
                                User {activity.user} {activity.action}
                            </p>
                        </div>
 
                        <div className="flex items-center gap-3">
                            <span className={`text-sm font-medium ${activity.isRead ? "text-gray-600" : "text-red-600"}`}>
                                {activity.isRead ? "Read" : "Unread"}
                            </span>
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
    )
}

export default RecentActivityTable
