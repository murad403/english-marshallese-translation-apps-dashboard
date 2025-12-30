import baseApi from "@/redux/api/api";

const settingApi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        getProfile: builder.query({
            query: () =>{
                return {
                    url: `/profile/`,
                    method: "GET"
                }
            },
            providesTags: ["profile"]
        }),
        updateProfile: builder.mutation({
            query: (data) =>{
                return {
                    url: `/profile/`,
                    method: "PUT",
                    body: data,
                    formData: true
                }
            },
            invalidatesTags: ["profile"]
        }),
        changePassword: builder.mutation({
            query: (data) =>{
                return {
                    url: `/password-change/`,
                    method: "POST",
                    body: data,
                }
            }
        }),

        getTermsAndService: builder.query({
            query: () =>{
                return {
                    url: "/administration/terms-service/",
                    method: "GET"
                }
            },
            providesTags: ["terms"]
        }),
        getPrivacyAndPolicy: builder.query({
            query: () =>{
                return {
                    url: "/administration/privacy-policy/",
                    method: "GET"
                }
            },
            providesTags: ["privacy"]
        }),
        getAboutUs: builder.query({
            query: () =>{
                return {
                    url: "/administration/about-us/",
                    method: "GET"
                }
            },
            providesTags: ["about"]
        }),
        updateTermsAndService: builder.mutation({
            query: (data) =>{
                return {
                    url: '/administration/terms-service/',
                    method: "PUT",
                    body: data
                }
            },
            invalidatesTags: ["terms"]
        }),
        updatePrivacyAndPolicy: builder.mutation({
            query: (data) =>{
                return {
                    url: '/administration/privacy-policy/',
                    method: "PUT",
                    body: data
                }
            },
            invalidatesTags: ["privacy"]
        }),
        updateAboutUs: builder.mutation({
            query: (data) =>{
                return {
                    url: '/administration/about-us/',
                    method: "PUT",
                    body: data
                }
            },
            invalidatesTags: ["about"]
        }),
    })
})

export const {useGetProfileQuery, useUpdateProfileMutation, useChangePasswordMutation, useGetTermsAndServiceQuery, useGetPrivacyAndPolicyQuery, useGetAboutUsQuery, useUpdateTermsAndServiceMutation, useUpdatePrivacyAndPolicyMutation, useUpdateAboutUsMutation} = settingApi;