import Basic from './Basic'
import Airtable from './Airtable'

// Para o Deploy, nós precisamos inserir algumas informações no netlify.toml, na parte de build. Como o
// command
// publish
// Além disso se o projeto tiver um redirect calibrado para /*, nós devemos setar um outro redirects nele, nesse projeto nao precisaria, mas de qualquer forma vou add lá


function App() {
  return <>
    <Basic />
    <Airtable />
  </>
}

export default App
