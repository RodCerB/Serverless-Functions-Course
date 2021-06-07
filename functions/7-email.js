exports.handler = async (event, context, callback) =>{
    const method = event.httpMethod;
    if(method !== "POST"){
        return {
            statusCode:405,
            body:'Only POST Requests Allowed'
        }
    }
    const {name, email, subject, message} = JSON.parse(event.body)
    if(!name || !email || !subject || !message){
        return {
            statusCode:400,
            body:'Please Provide All Values'
        }
    }
    return {
        statusCode:200,
        body:'Our Email Example'
    }
}