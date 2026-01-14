import baseApi from "@/redux/api/api";

const notificationApi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        notification: builder.query({
            query: () =>{
                return {
                    url: "/administration/notifications/",
                    method: "GET"
                }
            },
            providesTags: ["ai-submission"]
        })
    })
})

export const {useNotificationQuery} = notificationApi;