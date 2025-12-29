/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAiTranslationDetailsQuery } from '@/redux/features/translation/translation.api';
import React from 'react'

const AiTranslationRequestHeader = ({ aiTranslationId }: { aiTranslationId: any }) => {
    const {data} = useGetAiTranslationDetailsQuery(aiTranslationId);
    return (
        <div className='bg-main rounded-xl p-5 flex justify-between flex-col md:flex-row items-center gap-4'>
            <div className='flex items-center gap-4 text-header font-medium text-subheading'>
                <h3>#{aiTranslationId}</h3>
                <h2>{data?.data?.created_date}</h2>
            </div>
        </div>
    )
}

export default AiTranslationRequestHeader