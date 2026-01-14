import React from 'react'
import { IoNotificationsOutline } from 'react-icons/io5'

const Notifications = () => {
  return (
    <div>
      <div className='p-4 bg-main rounded-lg flex items-center gap-4'>
        <div className='border border-border-color rounded-full p-3'>
            <IoNotificationsOutline size={25}/>
        </div>
        <div>
            <h3 className='text-header font-medium text-subheading capitalize'>body parts</h3>
            <p className='text-title text-normal'>Where are you from?</p>
        </div>
      </div>
      <div>

      </div>
    </div>
  )
}

export default Notifications
