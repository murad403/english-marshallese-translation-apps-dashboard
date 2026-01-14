/* eslint-disable @typescript-eslint/no-explicit-any */
export type TActivity = {
  id: number
  activity_type: string
  activity_type_display: string
  description: string
  user_email: string
  user_name: string
  time_ago: string
  is_read: boolean
  created_date: string
}


export type TUser = {
  id: number
  user_id: string
  user_name: string
  user_email: string
  user_phone: string
  joining_date: string
  status: string
  subscription: string
}


export type TDataset = {
  id: number
  english_text: string
  marshallese_text: string
  category: number
  category_details: TCategoryDetails
  context: any
  is_favorite: boolean
  usage_count: number
  created_by: any
  created_date: string
  updated_date: string
}
export type TCategoryDetails = {
  id: number
  name: string
}



export type TCategory = {
  id: number
  name: string
  context: string
  created_date: string
  updated_date: string
}


export type TTranslation = {
  id: number
  user_email: string
  source_text: string
  known_translation: string
  category: number
  category_details: TCategoryDetails
  notes: string
  status: string
  status_display: string
  admin_notes: any
  created_date: string
  updated_date: string
}


export type TNotification = {
  id: number
  english_text: string
  marshallese_text: string
  category: string
  created_date: string
  user_email: string
}
