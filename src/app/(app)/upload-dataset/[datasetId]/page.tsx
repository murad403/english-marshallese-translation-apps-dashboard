import AdminHeader from '@/components/shared/AdminHeader'
import ManageDatasetHeader from '../ManageDatasetHeader'
import EditDataset from './EditDataset'

const page = () => {
  return (
    <div className='space-y-4'>
        <AdminHeader title='Add New Translation' isShowBackButton></AdminHeader>
        <ManageDatasetHeader></ManageDatasetHeader>
        <EditDataset></EditDataset>
    </div>
  )
}

export default page
