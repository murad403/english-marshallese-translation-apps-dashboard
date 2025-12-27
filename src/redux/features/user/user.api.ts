import baseApi from "@/redux/api/api";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        allUsers: builder.query({
            query: () =>{
                return {
                    url: `/administration/submissions/page/1/`,
                    method: "GET"
                }
            }
        }),

    })
})

export const {useAllUsersQuery} = userApi;