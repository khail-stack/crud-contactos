import React, {useEffect, useState, useCallback} from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';


export const Productos = () => {

    const [articles, setArticles] = useState([])

    const getArticles =  useCallback(async () => {
        
        await axios.get('http://localhost:5000/api/v1/get-product').then(({data}) => {
            // console.log(data.data)
            setArticles(data.data)
        }).catch((e) => {
            console.log(e.response)
        })

    }, [],)
        
    useEffect(() => {
        getArticles();
    }, [getArticles])

    const handleDelete = (id) => {
        console.log(id)
        
        axios.delete(`http://localhost:5000/api/v1/delete-product/${id}`).then((e) => {
            console.log(e)
            getArticles();
        }).catch((e) => {
            console.log(e.response)
        })
    }
    

    return (
        <>
            <h2 className="text-center my-5">Listado de Productos</h2>
            <table className="table table-striped" >
                <thead className="bg-primary table-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Marca</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Fotos</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>

                <tbody>
                     {articles && articles.map((article, index) => (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{article.name}</td>
                                        <td>{article.brand}</td>
                                        <td>{article.price}</td>
                                        <td>{article.stock}</td>
                                        <td>
                                        <img
                                            alt="imagen"
                                            style={{ height: 'auto', width: '240px' }}
                                            prop="DefaultImage"
                                            className="img-fluid"
                                            src={article.image}/>
                                        </td>
                                        <td>
                                            <Link to={{
                                                pathname: `/productos/editar`,
                                                state: {
                                                    article: article
                                                }
                                            }}>
                                                <button className="btn btn-info mr-5">Editar</button>
                                            </Link>
                                            
                                            <button className="btn btn-warning" onClick={() => handleDelete(article._id)}>Eliminar</button>
                                        </td>
                                    </tr>
                                ))
                                }
                </tbody>
                
            </table>
        </>
    )
}
