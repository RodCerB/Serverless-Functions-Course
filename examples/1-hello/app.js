// A intenção aqui é quando o usuário navegar até a página, dinamicamente vai dar fetch na minha mensagem e mostrar dentro do h2(result)

const result = document.querySelector('.result')

const fetchData = async () => {
    try{
    //  const data = await axios.get('/.netlify/functions/1-hello');
    // Podemos pegar direto a informação de data usando o {data}
    // const {data} = await axios.get('/.netlify/functions/1-hello');
    // Redirects deixam os links numa forma mais simples, sem precisar escrever muito. Lá no netlify.toml vai perceber que tem 3 pontos no redirect, o from, o to e o status. Se não colocarmos o status, ele inicialmente dá um status 301 e com isso muda para a página 'correta', ao forçarmos o status 200, ele se mantém na página que '/api/-1-hello' sem forçadamente ir para '/.netlify/functions/1-hello', ainda recebendo as informações dela
    const {data} = await axios.get('/api/1-hello');
    result.textContent = data
    } catch (error) {
        console.log(error.response.data)
        result.textContent = error.response.data
    }
}

fetchData()