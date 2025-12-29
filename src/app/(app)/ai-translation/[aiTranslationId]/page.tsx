"use client"
import AdminHeader from '@/components/shared/AdminHeader'
import { useParams } from 'next/navigation'
import AiTranslationRequestHeader from './AiTranslationRequestHeader'
import EditAiTranslation from './EditAiTranslation'

const AiTranslationEdit = () => {
    const {aiTranslationId} = useParams();
  return (
     <div className='space-y-4'>
      <AdminHeader title='View Translation Request' isShowBackButton></AdminHeader>
      <AiTranslationRequestHeader aiTranslationId={aiTranslationId}></AiTranslationRequestHeader>
      <EditAiTranslation></EditAiTranslation>
    </div>
  )
}

export default AiTranslationEdit
