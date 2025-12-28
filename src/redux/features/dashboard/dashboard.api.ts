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
        userGrowth: builder.query({
            query: (params) =>{
                return {
                    url: `/administration/user-growth/?period=${params}`,
                    method: "GET"
                }
            }
        }),
        recentActivity: builder.query({
            query: () =>{
                return {
                    url: `/administration/recent-activity/`,
                    method: "GET"
                }
            }
        }),
    })
})

export const {useDashboardStatsQuery, useUserGrowthQuery, useRecentActivityQuery} = dashboardApi;