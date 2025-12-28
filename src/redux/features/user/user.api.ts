import baseApi from "@/redux/api/api";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        getUsers: builder.query({
            query: ({ page, search}) =>{
                return {
                    url: `/administration/users/page/${page}/?search=${search}`,
                    method: "GET"
                }
            },
            providesTags: ["user"]
        }),
        deleteUser: builder.mutation({
            query: (id) =>{
                return {
                    url: `/administration/users/${id}/`,
                    method: "DELETE"
                }
            },
            invalidatesTags: ["user"]
        })
    })
})

export const {useGetUsersQuery, useDeleteUserMutation} = userApi;