// Nós estamos passando o id pelo link, se lembra lá no product fizemos o <a> com o link add no final "?id=${id}". Se fizer aqui no handler, console.log(event) verá que temos um  "queryStringParameters: { id: '1' }" Por isso colocamos a condicional de o id existir

require('dotenv').config()
const Airtable = require('airtable-node');

const airtable = new Airtable({apiKey: process.env.AIRTABLE_API_KEY})
  .base('appf6MEFsztXOTO1U')
  .table('products')

exports.handler = async (event, context, callback) =>{
    const {id} = event.queryStringParameters
    if(id){
        try{
            const product = await airtable.retrieve(id)
            // Se colocarmos um id que não bate com o produto, vamos ter um erro, por isso precisamos setar uma condicional para quando isso ocorrer:
            if(product.error){
                return {
                    statusCode: 404,
                    body: `No product with id: ${id}`
                }
            }
            return {
                statusCode: 200,
                body: JSON.stringify(product)
            }
        } catch (error){
            return {
                statusCode: 404,
                body: `No product with id: ${id}`
            }
        }
    }
    return {
        statusCode:400,
        body:'Please provide product id'
    }
   
}