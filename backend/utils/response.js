export const goodResponse=({res,status=true,statusCode=200,data,message="success"}={})=>{

    return res.status(statusCode).send({
        message,
        ...data,
        status,
    })
}
export const badResponse=({res,status=false,statusCode=400,data,message="failed"}={})=>{

    return res.status(statusCode).send({
        message,
        ...data,
        status,
    })
}