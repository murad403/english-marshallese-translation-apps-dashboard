import AdminHeader from '@/components/shared/AdminHeader'
import React from 'react'
import TranslationManagementTable from './TranslationManagementTable'

const ManageTranslation = () => {
  return (
    <div className='space-y-4'>
      <AdminHeader title='Manage Translations'></AdminHeader>
      <TranslationManagementTable></TranslationManagementTable>
    </div>
  )
}

export default ManageTranslation
