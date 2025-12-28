import baseApi from "@/redux/api/api";

const datasetApi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        getDataset: builder.query({
            query: ({page}) =>{
                return {
                    url: `/administration/translations/page/${page}/`,
                    method: "GET"
                }
            },
            providesTags: ["dataset"]
        }),
        deleteDataset: builder.mutation({
            query: (id: number) =>{
                return {
                    url: `/administration/translations/delete/${id}/`,
                    method: "DELETE"
                }
            },
            invalidatesTags: ["dataset"]
        }),
        updateDataset: builder.mutation({
            query: ({id, data}) =>{
                return {
                    url: `/administration/translations/update/${id}/`,
                    method: "PUT",
                    body: data
                }
            },
            invalidatesTags: ["dataset"]
        })
    })
})

export const {useGetDatasetQuery, useDeleteDatasetMutation, useUpdateDatasetMutation} = datasetApi;