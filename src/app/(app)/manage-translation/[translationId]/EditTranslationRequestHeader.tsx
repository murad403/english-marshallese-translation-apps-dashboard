/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetSubmissionDetailsQuery } from '@/redux/features/translation/translation.api';
import React from 'react'

const EditTranslationRequestHeader = ({ translationId }: { translationId: any }) => {
    const {data} = useGetSubmissionDetailsQuery(translationId);
    return (
        <div className='bg-main rounded-xl p-5 flex justify-between flex-col md:flex-row items-center gap-4'>
            <div className='flex items-center gap-4 text-header font-medium text-subheading'>
                <h3>#{translationId}</h3>
                <h2>{data?.data?.created_date}</h2>
            </div>
            <div className="flex gap-2">
                <p className="px-4 py-2 rounded-md text-normal font-medium bg-common text-white">
                    Submission (28)
                </p>
                <p className="px-4 py-2 rounded-md text-normal border border-title font-medium text-title">
                    AI Translation (32)
                </p>
            </div>
        </div>
    )
}

export default EditTranslationRequestHeader