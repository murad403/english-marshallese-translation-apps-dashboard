import AdminHeader from '@/components/shared/AdminHeader'
import React from 'react'
import UserManagementTable from './UserManagementTable'

const Users = () => {
  return (
    <div className='space-y-4'>
      <AdminHeader title='User Management'></AdminHeader>
      <UserManagementTable></UserManagementTable>
    </div>
  )
}

export default Users
