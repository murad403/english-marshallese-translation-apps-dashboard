import baseApi from "@/redux/api/api"

const dashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        dashboardStats: builder.query({
            query: () =>{
                return {
                    url: "/administration/dashboard-stats/",
                    method: "GET"
                }
            }
        }),
    })
})

export const {useDashboardStatsQuery} = dashboardApi;