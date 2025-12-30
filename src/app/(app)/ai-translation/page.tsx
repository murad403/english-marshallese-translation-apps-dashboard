import AdminHeader from '@/components/shared/AdminHeader'
import AitranslationManagementTable from './AitranslationManagementTable'

const AiTranslation = () => {
  return (
    <div className='space-y-4'>
      <AdminHeader title='Ai Translations'></AdminHeader>
      <AitranslationManagementTable></AitranslationManagementTable>
    </div>
  )
}

export default AiTranslation
