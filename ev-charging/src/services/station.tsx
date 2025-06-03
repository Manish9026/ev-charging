
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from './index';

const baseQuery=fetchBaseQuery({
    baseUrl:  `${baseUrl}/api/stations`,
    credentials:"include"
})
export const stationApi=createApi({

    reducerPath:"station",
    baseQuery,
    endpoints:(builder)=>({

        stations:builder.query({
            query:()=>({
                url:``,
                method:"GET"
            })
        }),
        stationById:builder.query({
            query:(id)=>({
                url:`${id}`,
                method:"GET"
            })
        })
    })
})

export const {useLazyStationsQuery,useStationsQuery,useStationByIdQuery}=stationApi;


