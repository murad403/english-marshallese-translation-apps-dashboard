import baseApi from "@/redux/api/api";


const authApi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        signInUser: builder.mutation({
            query: (data) =>{
                return {
                    url: "/login/",
                    method: "POST",
                    body: data
                }
            }
        }),
        forgotPassword: builder.mutation({
            query: (data) =>{
                return {
                    url: "/password-reset/request/",
                    method: "POST",
                    body: data
                }
            }
        }),
        verifyOtp: builder.mutation({
            query: (data) =>{
                return {
                    url: "/reset/otp-verify/",
                    method: "POST",
                    body: data
                }
            }
        }),
        resetPassword: builder.mutation({
            query: (data) =>{
                return {
                    url: '/password-reset/confirm/',
                    method: "POST",
                    body: data
                }
            }
        })
    })
})

export const {useSignInUserMutation, useForgotPasswordMutation, useVerifyOtpMutation, useResetPasswordMutation} = authApi;