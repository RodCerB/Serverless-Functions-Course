require('dotenv').config()

const axios = require('axios')

// Vou fazer uma modificação no link, deixando a parte da cidade no fim, assim, quando for fazer const resp no try, só preciso colocar url e city juntos que ja fica certo
const url = `https://api.openweathermap.org/data/2.5/weather?&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric&q=`

exports.handler = async (event, context, callback) =>{
    const method = event.httpMethod
    if(method !== 'POST'){
        return {
            statusCode:405,
            body: 'Only POST Requests Allowed'
        }
    }
    // Como falei, o POST manda para o body da nossa api algo, no caso o city que estarei pegando agora
    const {city} = JSON.parse(event.body)
    try {
        const resp = await axios.get(`${url}${city}`)
        return {
            statusCode:200,
            body: JSON.stringify(resp.data)
        }
    } catch(error) {
        return {
            statusCode:404,
            body: JSON.stringify(error)
        }
    }
}