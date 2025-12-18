import AdminHeader from '@/components/shared/AdminHeader'
import React from 'react'
import AddCategoryHeader from './AddCategoryHeader'
import AddCategory from './AddCategory'

const page = () => {
  return (
    <div className='space-y-4'>
      <AdminHeader title='Add New Category' isShowBackButton></AdminHeader>
      <AddCategoryHeader></AddCategoryHeader>
      <AddCategory></AddCategory>
    </div>
  )
}

export default page
