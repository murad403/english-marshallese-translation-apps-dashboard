import baseApi from "@/redux/api/api";


const authApi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        signInUser: builder.mutation({
            query: (data) =>{
                return {
                    url: "/dashboard/login/",
                    method: "POST",
                    body: data
                }
            }
        })
    })
})

export const {useSignInUserMutation} = authApi;