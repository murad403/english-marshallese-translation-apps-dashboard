import AdminHeader from '@/components/shared/AdminHeader'
import Stats from './dashboard/Stats'
import UserGrothChart from './dashboard/UserGrothChart'

const page = () => {
  return (
    <div className='space-y-4'>
      <AdminHeader title='mr john'></AdminHeader>
      <Stats></Stats>
      <div className='flex flex-col md:flex-row gap-4'>
        <div className='w-full md:w-2/3'>
          <UserGrothChart></UserGrothChart>
        </div>
        <div className='w-full md:w-1/3'>

        </div>
      </div>
    </div>
  )
}

export default page
