import React from 'react'

const Stats = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
      <div className='bg-main rounded-xl p-5 space-y-1'>
        <p className='text-title text-normal'>Total Users</p>
        <h2 className='text-[36px] font-medium text-title'>1289</h2>
        <p className='text-normal text-[#00793D]'>+25%</p>
      </div>

      <div className='bg-main rounded-xl p-5 space-y-1'>
        <p className='text-title text-normal'>Total Earn</p>
        <h2 className='text-[36px] font-medium text-title'>$1289</h2>
        <p className='text-normal text-[#00793D]'>+5%</p>
      </div>

      <div className='bg-main rounded-xl p-5 space-y-1'>
        <p className='text-title text-normal'>Pending Submission</p>
        <h2 className='text-[36px] font-medium text-title'>1289</h2>
        <p className='text-normal text-[#00793D]'>+25%</p>
      </div>

      <div className='bg-main rounded-xl p-5 space-y-1'>
        <p className='text-title text-normal'>AI</p>
        <h2 className='text-[36px] font-medium text-title'>1289</h2>
        <p className='text-normal text-[#00793D]'>+25%</p>
      </div>
    </div>
  )
}

export default Stats
