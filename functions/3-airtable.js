// Observações importantes: A key do airtable ela fica exposta, dessa forma qualquer pessoa pode chegar e deletar todos os seus produtos. Para evitar isso, não vamos utilizar a api diretamente no frontend, vamos usar o serveless, além disso vamos usar o ENV para guardar nossa key, por isso só subi no github após definir isso corretamente.
// Resumindo: Se fizéssemos o api request diretamente no frontend, só que usando o env, o netlify não conseguiria ler a api pq não entenderia a key vindo do env, para isso precisamos puxar ela para o serverless, dessa forma armazenando apenas os dados da api, e aí sim passando para o frontend, deixando dessa forma 'legível' para o netlify

// OBS: Para add o env key no netlify, precisa ir em site setings -> Build & deploy -> enviroment variables -> lá add

// aqui nós estamos usando o module airtable-node que facilita na hora de fazer o request da api, por isso não estamos usando métodos tradicionais de fetch api etc
require('dotenv').config()
const Airtable = require('airtable-node');

const airtable = new Airtable({apiKey: process.env.AIRTABLE_API_KEY})
  .base('appf6MEFsztXOTO1U')
  .table('products')

exports.handler = async (event, context, callback) =>{
    try{
        // const data = await airtable.list()
        // Vi que os dados estão dentro de records, então vou destruturar
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