"use client"
import AdminHeader from '@/components/shared/AdminHeader';
import { useParams } from 'next/navigation'
import EditTranslationRequest from './EditTranslationRequest';
import EditTranslationRequestHeader from './EditTranslationRequestHeader';



const TranslationEdit = () => {
  const { translationId } = useParams();
  // console.log(typeof translationId)
  return (
    <div className='space-y-4'>
      <AdminHeader title='View Translation Request' isShowBackButton></AdminHeader>
       <EditTranslationRequestHeader translationId={translationId}></EditTranslationRequestHeader>
      <EditTranslationRequest></EditTranslationRequest>
    </div>
  )
}

export default TranslationEdit
