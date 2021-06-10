// Esse é um exemplo de projeto onde é mais do que importate ter essa passagem de dados para o servidor, no  caso o serverless, pq são os dados de cartõe e pagamento que está sendo trabalhado. É inadimissível imaginar que as informações sejam salvas no frontend e dele seja enviado para o back, pq qualquer pessoa que chege maliciosa e tendo um bom uso do devtools conseguirá roubar as informações.

require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_KEY)

exports.handler = async (event, context, callback) =>{
    const method = event.httpMethod
    if(method !== 'POST'){
        return {
            statusCode:405,
            body:'Only Accepts POST Requests'
        }
    }
    const {purchase, total_amount, shipping_fee} = JSON.parse(event.body)
    const calculateOrderAmount = () => {
        // na documentação do site Stripe, eles recomendam aqui fazer uma dupla checagem usando a id dos produtos para confirmar com o banco de dados se, o preço que esta sendo somado bate com o preço dos produtos. Uma forma de segurança a mais para caso alguem maliciosamente altere os valores dos produtos no frontent. Mas aqui para efeito de praticidade e velocidade, vamos puxar direto os valores de lá e so somar mesmo
        return shipping_fee + total_amount
    }
    try{
        const paymentIntent = await stripe.paymentIntents.create({
            amount: calculateOrderAmount(),
            currency:'usd'
        })   
    return {
        statusCode:200,
        body: JSON.stringify({clientSecret:paymentIntent})
    }
    } catch(error) {
        return {
            statusCode:500,
            body: JSON.stringify({error:error.message})
        }
    }
}