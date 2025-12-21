/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="rounded-lg bg-blue-600 px-4 py-2 text-white shadow-lg">
                <p className="text-sm font-semibold">{payload[0].value}</p>
            </div>
        )
    }
    return null
}

export default CustomTooltip
