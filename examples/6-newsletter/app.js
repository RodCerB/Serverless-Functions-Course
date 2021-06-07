const form = document.querySelector('.form')
const emailInput = document.querySelector('.email-input')
const alert = document.querySelector('.alert')
alert.style.display = 'none'

form.addEventListener('submit', async function(e){
    e.preventDefault();
    // aqui estou fazendo uma 'animação' usando apenas css. No caso, ele add loading ao nome de uma classe, que estando preprogramada para fazer a animação para essa classe específica
    form.classList.add('loading')
    alert.style.display = 'none'
    const email = emailInput.value
    try {
        // novamente estamos usando o metodo post, pois estamos enviando o nome do email que o usuário escrever
        // usamos o await pois queremos ver qual será a resposta da api. Se der algum erro, vai entrar no catch, se ocorrer tudo bem, seguiremos com o form.innerHTML
        await axios.post('/api/6-newsletter', {email})
        form.innerHTML = `<h4 class="success">Success! Please check your email</h4>`
    } catch(error) {
        console.log(error.response)
        // tornando o alerta visível
        alert.style.display = 'block'
        alert.textContent = 'Something went wrong. Please try again.'
        // alert.textContent = error.response.data.email[0]
    }
    // 'Desativando' a animação de loading
    form.classList.remove('loading')
})