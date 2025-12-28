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
                <CardContent className="p-4 sm:p-6">
                    {/* Header */}
                    <div className="md:mb-10 pb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#BCCCEE]">
                        <h2 className="text-normal font-semibold text-header">
                            User Growth ({total.toLocaleString()})
                        </h2>
                        <div className="flex flex-wrap items-center gap-4">
                            <button
                                onClick={() => handleFilterChange("month")}
                                className={
                                    filter === "month"
                                        ? "border-b border-[#BCCCEE] text-common"
                                        : ""
                                }
                            >
                                Month
                            </button>
                            <button
                                onClick={() => handleFilterChange("year")}
                                className={
                                    filter === "year"
                                        ? "border-b border-[#BCCCEE] text-common"
                                        : ""
                                }
                            >
                                Year
                            </button>
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="h-75 w-full sm:h-87.5 lg:h-140">
                        {isLoading ? (
                            <div className="h-full flex items-center justify-center text-gray-500">
                                Loading...
                            </div>
                        ) : error ? (
                            <div className="h-full flex items-center justify-center text-red-500">
                                Failed to load data
                            </div>
                        ) : chartData.length === 0 ? (
                            <div className="h-full flex items-center justify-center text-gray-500">
                                No data available
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData} margin={{ top: 20, right: 10, left: -50, bottom: 0 }}>
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
                                        tick={{ fill: "#6b7280", fontSize: 13 }}
                                        dy={10}
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
                                        strokeWidth={2.5}
                                        fill="url(#colorValue)"
                                        dot={<CustomDot dataLength={chartData.length} />}
                                        activeDot={{
                                            r: 6,
                                            fill: "white",
                                            stroke: "#3b82f6",
                                            strokeWidth: 3,
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