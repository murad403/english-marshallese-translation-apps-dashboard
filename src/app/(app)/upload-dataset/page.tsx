import AdminHeader from '@/components/shared/AdminHeader'
import React from 'react'
import ManageDatasetTable from './ManageDatasetTable'

const UploadDataset = () => {
  return (
    <div className='space-y-4'>
      <AdminHeader title='Manage Dataset'></AdminHeader>
      <ManageDatasetTable></ManageDatasetTable>
    </div>
  )
}

export default UploadDataset
