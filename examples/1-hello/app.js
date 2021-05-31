// A intenção aqui é quando o usuário navegar até a página, dinamicamente vai dar fetch na minha mensagem e mostrar dentro do h2(result)

const result = document.querySelector('.result')

const fetchData = async () => {
    try{
    //  const data = await axios.get('/.netlify/functions/1-hello');
    const {data} = await axios.get('/.netlify/functions/1-hello');
    result.textContent = data
    } catch (error) {
        console.log(error.response.data)
        result.textContent = error.response.data
    }
}

fetchData()