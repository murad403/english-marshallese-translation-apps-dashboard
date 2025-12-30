"use client"
import { useState } from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import CustomTooltip from "@/components/ui/CustomTooltip"
import CustomDot from "@/components/ui/CustomDot"
import { useUserGrowthQuery } from "@/redux/features/dashboard/dashboard.api"


export interface UserGrowthData {
    period: string
    count: number
}

const UserGrothChart = () => {
    const [filter, setFilter] = useState<"month" | "year">("month");
    const { data, isLoading, error } = useUserGrowthQuery(filter);
    
    // Use provided data or fallback to empty array
    const chartData = data?.data?.growth_data || [];
    
    // Calculate total from actual data
    const total = chartData.reduce((sum: number, item: UserGrowthData) => sum + item.count, 0);

    const handleFilterChange = (newFilter: "month" | "year") => {
        setFilter(newFilter);
    }

    return (
        <Card className="w-full">
            <CardContent>
                {/* Header */}
                <div className="mb-4 pt-4 sm:mb-6 md:mb-10 pb-3 sm:pb-4 md:pb-5 flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#BCCCEE]">
                    <h2 className="text-normal text-header">
                        User Growth ({total.toLocaleString()})
                    </h2>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                        <button
                            onClick={() => handleFilterChange("month")}
                            className={`text-small transition-colors ${
                                filter === "month"
                                    ? "border-b-2 border-common text-common"
                                    : "text-title hover:text-gray-900"
                            }`}
                        >
                            Month
                        </button>
                        <button
                            onClick={() => handleFilterChange("year")}
                            className={`text-samll transition-colors ${
                                filter === "year"
                                    ? "border-b-2 border-common text-common"
                                    : "text-title hover:text-gray-900"
                            }`}
                        >
                            Year
                        </button>
                    </div>
                </div>

                {/* Chart */}
                <div className="h-60 sm:h-75 md:h-85 lg:h-141 w-full pb-14">
                    {isLoading ? (
                        <div className="h-full flex items-center justify-center text-gray-500">
                            <div className="text-center">
                                <div className="text-sm sm:text-base">Loading...</div>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="h-full flex items-center justify-center text-red-500">
                            <div className="text-center px-4">
                                <div className="text-sm sm:text-base">Failed to load data</div>
                            </div>
                        </div>
                    ) : chartData.length === 0 ? (
                        <div className="h-full flex items-center justify-center text-gray-500">
                            <div className="text-center px-4">
                                <div className="text-sm sm:text-base">No data available</div>
                            </div>
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart 
                                data={chartData} 
                                margin={{ 
                                    top: 10, 
                                    right: 5, 
                                    left: -45, 
                                    bottom: 0 
                                }}
                            >
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.95} />
                                        <stop offset="30%" stopColor="#93c5fd" stopOpacity={0.7} />
                                        <stop offset="70%" stopColor="#bfdbfe" stopOpacity={0.4} />
                                        <stop offset="100%" stopColor="#eff6ff" stopOpacity={0.05} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="0" stroke="transparent" vertical={false} />
                                <XAxis
                                    dataKey="period"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#4A4A4A", fontSize: window.innerWidth < 640 ? 10 : 13 }}
                                    dy={10}
                                    interval="preserveStartEnd"
                                />
                                <YAxis axisLine={false} tickLine={false} tick={false} />
                                <Tooltip
                                    content={<CustomTooltip />}
                                    cursor={{ stroke: "#93c5fd", strokeWidth: 1, strokeDasharray: "5 5" }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#3b82f6"
                                    strokeWidth={window.innerWidth < 640 ? 2 : 2.5}
                                    fill="url(#colorValue)"
                                    dot={<CustomDot dataLength={chartData.length} />}
                                    activeDot={{
                                        r: window.innerWidth < 640 ? 4 : 6,
                                        fill: "white",
                                        stroke: "#3b82f6",
                                        strokeWidth: window.innerWidth < 640 ? 2 : 3,
                                    }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

export default UserGrothChart