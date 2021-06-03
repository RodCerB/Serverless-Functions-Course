require('dotenv').config()
const Airtable = require('airtable-node');

const airtable = new Airtable({apiKey: process.env.AIRTABLE_API_KEY})
  .base('appf6MEFsztXOTO1U')
  .table('survey')


exports.handler = async (event, context, callback) =>{
    // Para preparar o terreno para fazer nosso put, primeiro criamos uma constante para method, dessa forma poderemos criar condicionais
    const method = event.httpMethod
    if(method === 'GET'){
        try {
            const {records} = await airtable.list()
            const survey = records.map((item)=>{
                const {id} = item;
                const {room,votes} = item.fields
                return {id,room,votes}
            })
            return {
                statusCode:200,
                body:JSON.stringify(survey)
            }
        } catch (error) {
            return {
                statusCode:400,
                body:'Server Error'
            }
        }
    }
    if(method === 'PUT'){
        try {
            // o que estamos mandando pelo metodo put está como object, para isso precisamos transformar em json
            const {id,votes} = JSON.parse(event.body)
            if(!id || !votes){
                return {
                statusCode: 400,
                body: 'Please provide id and votes values'
                }
             }
            // Finalmente vamos mandar a mudança para a nossa api. Devemos usar a constante 'fields' como instruido na documentação, e dizemos por fim que votes irá receber Number(votes), no caso transformamos em numero o que pegamos no nosso frontend que vem como string, e add mais um
            const fields = {votes:Number(votes)+1}
            const item = await airtable.update(id,{fields})
            console.log(item)
            if(item.error){
                return {
                    statusCode:400,
                    body:JSON.stringify(item)
                }
            }
            return {
                statusCode:200,
                body:JSON.stringify(item)
            }
        } catch (error) {
            return {
                statusCode:400,
                body: 'Please provide id and votes values'
            }
        }
    }
    // default response:
    return {
        statusCode: 405,
        body: 'Only GET and PUT Requests Allowed'
    }
}
