// domain/.netlify/functions/1-hello


// Nós estamos no ecosistema do Node, logo ele tem suas próprias regras,  o uso do exports é uma delas. No ES6 trabalhamos com 'imports' e 'export', no Node usamos 'exports' e após o . definimos o que está sendo exportado, no caso uma função. Aqui é obrigatório chamar essa função de 'handler' pois é exatamente ela que o netlify está procurando.
// Pq estamos usando async, mas nao tem um await? Essa função nós precisamos retornar uma promise, e o async sempre retorna um promise.  Apesar de que pode ser feito sem usar o async:
// exports.handler = (event, context, callback) =>{
//     callback(null, 
//         {statusCode:200, body: 'Hello World!'}    
//     )
// }

// const person = {name: 'john'}

exports.handler = async (event, context, callback) =>{
    // sempre devemos retornar um object com PELO MENOS o statusCode e o body
    return {
        statusCode:200,
        // Nós SEMPRE precisamos retornar uma string para o body! Se tentar passar um object vai dar erro, contudo, é possível 'stringuificar' um object:
        // body: JSON.stringify(person)
        body:'Hello World'
    }
}

// Status Code são os códigos de resposta de requisições HTTP, onde cada um indica algo.
// OBS: Aqui nós quem estruturamos a função, poderia chegar e colocar no statusCode 404, mas no body dizer que foi bem sucedido. É aquilo, não é pq podemos, que devemos fazer.

// Existem 5 classes:
//      Respostas de informação (100-199),
//      Respostas de sucesso (200-299),
//      Redirecionamentos (300-399)
//      Erros do cliente (400-499)
//      Erros do servidor (500-599).
// Obviamente não precisa decorar todos, mas os mais importantes são:
//  200 OK
//       Estas requisição foi bem sucedida. O significado do sucesso varia de acordo com o método HTTP:
//  201 Created
//       A requisição foi bem sucedida e um novo recurso foi criado como resultado. Esta é uma tipica resposta enviada após uma requisição POST.
//  400 Bad Request
//       Essa resposta significa que o servidor não entendeu a requisição pois está com uma sintaxe inválida.
//  404 Not Found
//       O servidor não pode encontrar o recurso solicitado. Este código de resposta talvez seja o mais famoso devido à frequência com que acontece na web.
//  500 Internal Server Error
//       O servidor encontrou uma situação com a qual não sabe lidar.