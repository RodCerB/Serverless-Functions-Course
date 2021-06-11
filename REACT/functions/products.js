// fizemos um ctrl c direto do function completo lá do serverless com js
// eu já havia excluido minhas constas do airtable e outros, então nem criei o env, apenas fazendo a estrutura mesmo

// No exemplo 1(Basic) eu rodei como npm start mesmo, mas agora eu ja preciso usar o npm run netlify pois estamos trabalhando no nosso serverless
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
    try{
        const {records} = await airtable.list()
        const products = records.map((product)=>{
            const {id} = product
            const {name, image, price} = product.fields
            const url = image[0].url

            return {id,name,url,price}
        })
        return {
            statusCode:200,
            body: JSON.stringify(products)
        }
    } catch (error) {
        return {
        statusCode:500,
        body: 'Server Error'
        }
    }
}