import baseApi from "@/redux/api/api";

const translationApi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        // getSubmission: builder.query({
        //     query: ({ page, search}) =>{
        //         return {
        //             url: `/administration/submissions/page/${page}/?search=${search}`,
        //             method: "GET"
        //         }
        //     },
        //     providesTags: ["translation"]
        // }),
        // deleteSubmission: builder.mutation({
        //     query: (id) =>{
        //         return {
        //             url: `/administration/submissions/${id}/delete/`,
        //             method: "Delete"
        //         }
        //     },
        //     invalidatesTags: ["translation"]
        // }),
        // getSubmissionDetails: builder.query({
        //     query: (id) =>{
        //         return {
        //             url: `/administration/submissions/${id}/`,
        //             method: "GET"
        //         }
        //     },
        //     providesTags: ["translation"]
        // }),
        // updateSubmission: builder.mutation({
        //     query: ({id, data}) =>{
        //         return {
        //             url: `/administration/submissions/${id}/update/`,
        //             method: "PUT",
        //             body: data
        //         }
        //     },
        //     invalidatesTags: ["translation"]
        // }),

        getAiTranslation: builder.query({
            query: ({ page, search}) =>{
                return {
                    url: `/administration/ai-feedback/page/${page}/?search=${search}`,
                    method: "GET"
                }
            },
            providesTags: ["ai-submission"]
        }),
        deleteAiTranslation: builder.mutation({
            query: (id) =>{
                return {
                    url: `/administration/ai-feedback/${id}/delete/`,
                    method: "Delete"
                }
            },
            invalidatesTags: ["ai-submission"]
        }),
        getAiTranslationDetails: builder.query({
            query: (id) =>{
                return {
                    url: `/administration/ai-feedback/${id}/`,
                    method: "GET"
                }
            },
            providesTags: ["ai-submission"]
        }),
        updateAiTranslation: builder.mutation({
            query: ({id, data}) =>{
                return {
                    url: `/administration/ai-feedback/${id}/update/`,
                    method: "PUT",
                    body: data
                }
            },
            invalidatesTags: ["ai-submission"]
        }),
    })
})

export const {useGetAiTranslationQuery, useDeleteAiTranslationMutation, useGetAiTranslationDetailsQuery, useUpdateAiTranslationMutation} = translationApi;