// it takes few minutes

const form = document.querySelector('.form')
const input = document.querySelector('.form-input')
const alert = document.querySelector('.alert')
const result = document.querySelector('.result')
alert.style.display = 'none'


form.addEventListener('submit', (event)=>{
    event.preventDefault()
    const city = input.value
    if(city){
        getWeatherData(city)
    }
})

async function getWeatherData(city){
    alert.style.display = 'none'
    try {
        // Aqui nós vamos usar um outro método HTTP, no caso o POST. De fato nós não vamos criar nenhuma informação nova na api, contudo, vamos mandar para ela um texto, no caso vai ser o nome das cidades, e aí sim ela irá trabalhar. Como não queremos fazer isso no frontend, precisamos usar o post para mandar para o body do nosso serverless.
        // para mandar definimos onde, no caso o /api/5-weather, e mandamos como object os dados que queremos, no caso city
        const{data} = await axios.post('/api/5-weather', {city})
        const {name} = data
        const {country} = data.sys
        const {temp_max:max, temp_min:min, feels_like} = data.main
        const {description} = data.weather[0]

        result.innerHTML = `
        <article class="card">
            <h3>${name},${country}</h3>
            <p>${description}</p>
            <p>min temp : ${min}ºc</p>
            <p>max temp : ${max}ºc</p>
            <p>feels like : ${feels_like}ºc</p>
        </article>
        `
    } catch(error){
        alert.style.display = 'block'
        alert.textContent = `Can't find weather data for city "${city}"`
    }
}