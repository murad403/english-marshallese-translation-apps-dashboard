import baseApi from "@/redux/api/api";

const datesetApi = baseApi.injectEndpoints({
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

export const {useAllUsersQuery} = datesetApi;