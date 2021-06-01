// No lugar de criar o object diretamente aqui na api, criamos externamente um arquivo com todos os dados, exportamos no estilo node(module.exports = items) e vamos importar aqui
// const items = [
//     {name:'susan'},
//     {name:'ana'}
// ]

const items = require('../assets/data')


exports.handler = async (event, context, callback) =>{
    
    return {
        statusCode:200,
        body: JSON.stringify(items)
    }
}