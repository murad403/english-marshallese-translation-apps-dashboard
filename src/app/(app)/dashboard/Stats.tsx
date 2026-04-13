"use client"
import { useDashboardStatsQuery } from '@/redux/features/dashboard/dashboard.api'

const Stats = () => {
  const {data} = useDashboardStatsQuery(undefined);
  // console.log(data?.data);
  return (
    <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
      <div className='bg-main rounded-xl p-5 space-y-1'>
        <p className='text-title text-normal'>Total Users</p>
        <h2 className='text-[36px] font-medium text-title'>{data?.data?.total_users}</h2>
      </div>

      <div className='bg-main rounded-xl p-5 space-y-1'>
        <p className='text-title text-normal'>Total Earn</p>
        <h2 className='text-[36px] font-medium text-title'>${data?.data?.total_earn}</h2>
      </div>

      <div className='bg-main rounded-xl p-5 space-y-1'>
        <p className='text-title text-normal'>Pending Submission</p>
        <h2 className='text-[36px] font-medium text-title'>{data?.data?.pending_submissions}</h2>
      </div>

      <div className='bg-main rounded-xl p-5 space-y-1'>
        <p className='text-title text-normal'>AI</p>
        <h2 className='text-[36px] font-medium text-title'>{data?.data?.ai_feedback_count}</h2>
      </div>
    </div>
  )
}

export default Stats
