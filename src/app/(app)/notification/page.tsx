import AdminHeader from '@/components/shared/AdminHeader'
import React from 'react'
import Notifications from './Notifications'

const page = () => {
  return (
    <div className='space-y-4'>
      <AdminHeader title='Notifications'></AdminHeader>
      <Notifications></Notifications>
    </div>
  )
}

export default page
