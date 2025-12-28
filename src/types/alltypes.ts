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


export type  TUser = {
  id: number
  user_id: string
  user_name: string
  user_email: string
  user_phone: string
  joining_date: string
  status: string
  subscription: string
}
