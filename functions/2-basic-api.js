// No lugar de criar o object diretamente aqui na api, criamos externamente um arquivo com todos os dados, exportamos no estilo node(module.exports = items) e vamos importar aqui
// const items = [
//     {name:'susan'},
//     {name:'ana'}
// ]

const items = require('../assets/data')


exports.handler = async (event, context, callback) =>{
    
    return {
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        // Headers é usado para corrigir aquele problema de CORS, não sendo acessível em outros locais. É necessário fazer em todos os functions que pretende liberar
        statusCode:200,
        body: JSON.stringify(items)
    }
}