import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./index";


const baseQuery=fetchBaseQuery({
    baseUrl:`${baseUrl}/api/users`,
    credentials:"include"
})

export const authApi=createApi({
    reducerPath:"Auth",
    baseQuery,

    endpoints:(builder)=>({

        login:builder.mutation({
            query:(data)=>({
                url:"login",
                 method:"POST",
                body:data
            })
        }),

        register:builder.mutation({
            query:(data)=>({
                url:"register",
                method:"POST",
                body:data
            })
        }),
        verifyUser:builder.query({
            query:()=>({
                url:"verify-user",
                method:"GET",
            })
        }),
        
        logout:builder.query({
            query:()=>({
                url:"logout",
                method:"GET",
            })
        }),

    })

})

export const {useLoginMutation,useRegisterMutation,useLazyVerifyUserQuery,useLazyLogoutQuery}=authApi;
