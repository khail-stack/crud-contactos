import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between">
            <div class="container">
                <h1>
                    <Link to={'/'} className="text-light" >Crud de Productos</Link>
                </h1>
            </div>

            <Link to={'/productos/nuevo'} className="btn btn-danger nuevo-post d-block d-md-inline-block" href="/productos/nuevo">Agregar Producto &#43;</Link>
        </nav>
    )
}

export default Header
