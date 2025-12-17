import Wrapper from '@/components/wrapper/Wrapper';
import React from 'react'

const layout = ({
    children
}: Readonly<{
    children: React.ReactNode
}>) => {
    return (
        <div>
            <Wrapper>
                {
                    children
                }
            </Wrapper>
        </div>
    )
}

export default layout