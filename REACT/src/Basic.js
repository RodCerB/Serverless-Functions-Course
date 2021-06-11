import React, {useEffect, useState} from 'react'
import axios from 'axios'
// Estamos usando o url do meu deplou no netlify por questão de uso mesmo. Pq no do Smilga se estiverem muitas requisições ele pode excluir o projeto e ficaria sem os dados, então usando o meu
const url = 'https://serverless-course-js.netlify.app/api/2-basic-api'

const Basic = () => {
    const [products, setProducts] = useState([])

    const fetchData = async () => {
        try{
            const {data} = await axios.get(url)
            setProducts(data)
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchData()
    }, [])
    
    return (
        <section className='section section-center'>
            <div className='title'>
                <h2>basic setup</h2>
                <div className='title-underline'></div>
            </div>
            <div className="products">
                {products.map((product)=>{
                    const {id, image:{url}, price, name} = product
                    return <article className='product' key={id}>
                        <img src={url} alt={name} />
                        <div className="info">
                            <h5>{name}</h5>
                            <h5 className='price'>$ {price}</h5>
                        </div>
                    </article>
                })}
            </div>
        </section>
    )
}

export default Basic