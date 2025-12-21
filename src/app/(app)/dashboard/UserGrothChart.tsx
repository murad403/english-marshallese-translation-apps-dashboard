/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState } from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import CustomTooltip from "@/components/ui/CustomTooltip"
import CustomDot from "@/components/ui/CustomDot"


// Type definitions for API integration
export interface UserGrowthData {
    month: string
    value: number
}

interface UserGrowthChartProps {
    data?: UserGrowthData[]
    totalUsers?: number
    onFilterChange?: (filter: "month" | "year") => void
}

// Sample data - replace this with your API data
const sampleMonthData: UserGrowthData[] = [
    { month: "Jan", value: 450 },
    { month: "Feb", value: 380 },
    { month: "March", value: 520 },
    { month: "April", value: 680 },
    { month: "May", value: 580 },
    { month: "June", value: 750 },
    { month: "July", value: 650 },
    { month: "Aug", value: 900 },
    { month: "Sep", value: 820 },
    { month: "Oct", value: 720 },
    { month: "Nov", value: 980 },
    { month: "Dec", value: 1450 },
]

const sampleYearData: UserGrowthData[] = [
    { month: "2019", value: 1200 },
    { month: "2020", value: 1500 },
    { month: "2021", value: 1800 },
    { month: "2022", value: 2100 },
    { month: "2023", value: 2300 },
    { month: "2024", value: 2500 },
]

// Custom tooltip component
// const CustomTooltip = ({ active, payload }: any) => {
//     if (active && payload && payload.length) {
//         return (
//             <div className="rounded-lg bg-blue-600 px-4 py-2 text-white shadow-lg">
//                 <p className="text-sm font-semibold">{payload[0].value}</p>
//             </div>
//         )
//     }
//     return null
// }

// Custom dot component with orange circle
// const CustomDot = (props: any) => {
//     const { cx, cy, payload, index, dataLength } = props

//     // Only show dot on hover or for specific data points
//     if (index === Math.floor(dataLength / 2)) {
//         return (
//             <g>
//                 <circle cx={cx} cy={cy} r={6} fill="white" stroke="#FFFFFF" strokeWidth={17} />
//                 <circle cx={cx} cy={cy} r={8} fill="#FEA41D" strokeWidth={15}/>
//             </g>
//         )
//     }
//     return null
// }

const UserGrothChart = () => {
    const [filter, setFilter] = useState<"month" | "year">("month")
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [isCalendarOpen, setIsCalendarOpen] = useState(false)
    // console.log( date)

    // Use provided data or fallback to sample data
    const chartData = (filter === "month" ? sampleMonthData : sampleYearData)
    const total = 2500

    const handleFilterChange = (newFilter: "month" | "year") => {
        setFilter(newFilter)
        // onFilterChange?.(newFilter)
        console.log(filter)
    }

    return (
        <Card className="w-full">
            <CardContent className="p-4 sm:p-6">
                {/* Header */}
                <div className="md:mb-10 pb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#BCCCEE]">
                    <h2 className="text-normal font-semibold text-header">User Growth ({total.toLocaleString()})</h2>

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

                        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                            <PopoverTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <CalendarIcon className="h-4 w-4" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="end">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={(newDate) => {
                                        setDate(newDate)
                                        setIsCalendarOpen(false)
                                    }}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                {/* Chart */}
                <div className="h-75 w-full sm:h-87.5 lg:h-100">
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
                                dataKey="month"
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
                                dataKey="value"
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
                </div>
            </CardContent>
        </Card>
    )
}

export default UserGrothChart
