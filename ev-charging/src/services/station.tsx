
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from './index';

const baseQuery=fetchBaseQuery({
    baseUrl:  `${baseUrl}`,
    credentials:"include"
})
export const stationApi=createApi({

    reducerPath:"station",
    baseQuery,
    endpoints:(builder)=>({

        stations:builder.query({
            query:()=>({
                url:'station',

            })
        })
    })
})

const {useLazyStationsQuery}=stationApi;


