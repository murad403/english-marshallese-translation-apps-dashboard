import baseApi from "@/redux/api/api";

const datasetApi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        getTranslation: builder.query({
            query: ({page}) =>{
                return {
                    url: `/administration/translations/page/${page}/`,
                    method: "GET"
                }
            },
            providesTags: ["dataset"]
        }),
        deleteTranslation: builder.mutation({
            query: (id: number) =>{
                return {
                    url: `/administration/translations/delete/${id}/`,
                    method: "DELETE"
                }
            },
            invalidatesTags: ["dataset"]
        }),
        updateTranslation: builder.mutation({
            query: ({id, data}) =>{
                return {
                    url: `/administration/translations/update/${id}/`,
                    method: "PUT",
                    body: data
                }
            },
            invalidatesTags: ["dataset"]
        }),
        addTranslation: builder.mutation({
            query: (data) =>{
                return {
                    url: "/administration/translations/add/",
                    method: "POST",
                    body: data
                }
            },
            invalidatesTags: ["dataset"]
        }),
        getTranslationDetails: builder.query({
            query: ({id}) =>{
                return {
                    url: `/administration/translations/${id}/`,
                    method: "GET"
                }
            },
            providesTags: ["dataset"]
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

export const {useGetTranslationQuery, useDeleteTranslationMutation, useUpdateTranslationMutation, useAddTranslationMutation, useGetCategoriesQuery, useAddCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryMutation, useGetTranslationDetailsQuery} = datasetApi;