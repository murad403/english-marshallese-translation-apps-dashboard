/* eslint-disable @typescript-eslint/no-explicit-any */

const CustomDot = (props: any) => {
    const { cx, cy, payload, index, dataLength } = props
    // Only show dot on hover or for specific data points
    if (index === Math.floor(dataLength / 2)) {
        return (
            <g>
                <circle cx={cx} cy={cy} r={6} fill="white" stroke="#FFFFFF" strokeWidth={17} />
                <circle cx={cx} cy={cy} r={8} fill="#FEA41D" strokeWidth={15} />
            </g>
        )
    }
    return null
}

export default CustomDot;