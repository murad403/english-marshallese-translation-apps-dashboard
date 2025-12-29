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
        }),

        // category related api-------
        getCategories: builder.query({
            query: () =>{
                return {
                    url: "/administration/categories/",
                    method: "GET"
                }
            },
            providesTags: ["category"]
        }),
        addCategory: builder.mutation({
            query: (data) =>{
                return {
                    url: `/administration/categories/add/`,
                    method: "POST",
                    body: data
                }
            },
            invalidatesTags: ["category"]
        }),
        deleteCategory: builder.mutation({
            query: (id: number) =>{
                return {
                    url: `/administration/categories/${id}/delete/`,
                    method: "DELETE"
                }
            },
            invalidatesTags: ["category"]
        }),
        updateCategory: builder.mutation({
            query: ({id, data}) =>{
                return {
                    url: `/administration/categories/${id}/update/`,
                    method: "PUT",
                    body: data
                }
            },
            invalidatesTags: ["category"]
        }),
    })
})

export const {useGetDatasetQuery, useDeleteDatasetMutation, useUpdateDatasetMutation, useGetCategoriesQuery, useAddCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryMutation} = datasetApi;