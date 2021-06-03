const title = document.querySelector('.title h2')
const result = document.querySelector('.result')

const fetchData = async() => {
    try{
        const {data} = await axios.get('/api/4-survey')
        const response = data.map((vote)=>{
            const {room, votes, id} = vote
            // usa o metodo substring para pegar as 2 primeiras letras da palavra
            return `<li>
            <div class="key">${room.toUpperCase().substring(0,2)}</div>
            <div>
                <h4>${room}</h4>
                <p class="vote-${id}" data-votes="${votes}">${votes}</p>
            </div>
            <button data-id="${id}">
                <i class="fas fa-vote-yea"></i>
            </button>
            </li>`
        }).join('')
        result.innerHTML = response
    } catch (error) {
        result.innerHTML = `<h4>There was an error</h4>`
    }
}

window.addEventListener('load', ()=> {fetchData()})
// queremos fazer que ao clicar no botão, a nossa api att os valores de voto. Para isso inicialmente devemos setar a função que irá ser chamada com o botão sendo clicado:
result.addEventListener('click', async function(e){
    if(e.target.classList.contains('fa-vote-yea')){
        // buscamos o parentElement, que no caso é o button
        const btn = e.target.parentElement
        // por isso colocamos no button a data de nome id, e aí chamamos agora usando o dataset. Lembrando, se chamassemos de data-Abobora, aqui seria dataset.Abobora
        const id = btn.dataset.id
        // agora com o id setado, nos vamos pegar o parágrafo do voto usando:
        const voteNode = result.querySelector(`.vote-${id}`)
        // selecionamos a data dos votos para deixar ja pronta para modificar
        const votes = voteNode.dataset.votes
        // criamos uma função que vai ser chamada onde add +1 nos votos atuais
        const newVotes = await modifyData(id, votes)
        // feito isso precisamos ainda att o que temos no frontend, ai que entra a modificação tando do texto quanto da data

        title.textContent = 'Survey'
        // Eu quero apenas que tenhamos newVotes se fizermos a requisição de put da api e retorne algo. Por isso usamos esse condicional, pois ser der erro, ele irá retornar null, fazendo nada acontecer dessa forma
        if(newVotes){
            voteNode.textContent = `${newVotes} votes`
            voteNode.dataset.votes = newVotes
        }
    }
    // console.log(e.target)
})
// modify data
async function modifyData(id, votes){
    // Com esse return nós apenas modificamos o frontend, mas a api continua estática, por isso vamos fazer diferente:
    // return Number(votes) + 1
    title.textContent = 'LOADING...'
    try {
        // Vê que agora, no lugar de chamarmos por get, usamos o put. O link continua o mesmo, contudo, precisamos inserir mais informações. Ou seja, qual dado nós iremos modificar com o put
        const {data} = await axios.put(`/api/4-survey`,{id, votes})
        const newVotes = data.fields.votes
        return newVotes
    } catch (error){
        console.log(error.response)
        return null
    }
}


// HTTP METHODS
// Algumas informações importantes sobre comunicação http que usamos na nossa api, é prática do CRUD:
// C -> Create -> POST
// R -> Read -> GET
// U -> Update -> PUT
// D -> Delete -> DELETE

// Por isso sempre quando chamamos nossa api, o método que aparece é o método GET, pois estamos lendo ela. Dessa forma, agora como queremos modificar a api, em específico a quantidade de votos, vamos usar o metodo PUT, que é o de fazer uma att, um update.