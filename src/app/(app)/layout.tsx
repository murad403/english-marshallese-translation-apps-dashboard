import Wrapper from '@/components/wrapper/Wrapper';
import React from 'react'

const layout = ({
    children
}: Readonly<{
    children: React.ReactNode
}>) => {
    return (
        <Wrapper>
            {
                children
            }
        </Wrapper>

    )
}

export default layout