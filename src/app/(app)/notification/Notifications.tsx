"use client"
import { useNotificationQuery } from '@/redux/features/notification/notification.api';
import { TNotification } from '@/types/alltypes';
import Link from 'next/link';
import { IoNotificationsOutline } from 'react-icons/io5'

const Notifications = () => {
  const { data, isLoading } = useNotificationQuery(undefined);

  return (
    <div >
      {
        isLoading ? <div className="flex justify-center items-center h-full">
          <p className="text-sm sm:text-base text-gray-500">Loading...</p>
        </div> :
          <div className='space-y-2'>
            {
              data?.data?.notifications?.length > 0 ?
                data?.data?.notifications?.map((notification: TNotification) =>
                  <Link href={`/ai-translation/${notification?.id}`} key={notification?.id} className='p-4 bg-main rounded-lg flex items-center gap-4 border'>
                    <div className='border border-border-color rounded-full p-3'>
                      <IoNotificationsOutline size={25} />
                    </div>
                    <div>
                      <h3 className='text-header font-medium text-subheading capitalize'>{notification.category}</h3>
                      <p className='text-title text-normal'>{notification.english_text}</p>
                    </div>
                  </Link>
                )
                : <div className="flex flex-col items-center justify-center py-16 px-6">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 mb-6 flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-title mb-2">
                    No notifications yet
                  </h3>
                  <p className="text-sm text-muted-foreground text-center max-w-md">
                    There are currently no notifications in the system. Notifications will appear here once they are received.
                  </p>
                </div>
            }
          </div>
      }
    </div>
  )
}

export default Notifications
