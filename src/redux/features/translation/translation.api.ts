import baseApi from "@/redux/api/api";

const translationApi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        getTranslation: builder.query({
            query: ({ page, search}) =>{
                return {
                    url: `/administration/submissions/`,
                    method: "GET"
                }
            },
            providesTags: ["translation"]
        }),
    })
})

export const {useGetTranslationQuery} = translationApi;