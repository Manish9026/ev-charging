import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./index";


const baseQuery=fetchBaseQuery({
    baseUrl:`${baseUrl}/api/auth`,
    credentials:"include"
})

export const authApi=createApi({
    reducerPath:"Auth",
    baseQuery,

    endpoints:(builder)=>({

        login:builder.mutation({
            query:(data)=>({
                url:"login",
                body:data
            })
        }),

        register:builder.mutation({
            query:(data)=>({
                url:"register",
                body:data
            })
        }),
        verifyUser:builder.query({
            query:()=>({
                url:"verify-user",
            })
        }),

    })

})

export const {useLoginMutation,useRegisterMutation,useLazyVerifyUserQuery}=authApi;
