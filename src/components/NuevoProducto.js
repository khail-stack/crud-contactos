import React, {useState} from 'react'
import axios from 'axios';

const NuevoProducto = ({history}) => {

    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState('');
    const [image, setImage] = useState('');

    const convertBase64 = (image) => {
        return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(image);

        fileReader.onload = () => {
            resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
        });
    };

    const uploadFile = async (e) => {
        const imageFile = e;
        const base64 = await convertBase64(imageFile);
        setImage(base64);
    };

    const handleAdd = (e) => {
    e.preventDefault();

    const productos = {
      name: name,
      brand: brand,
      stock: parseInt(stock),
      price: parseFloat(precio),
      data: image
    };

    console.log(productos);

    axios
      .post('https://laboratorio9.herokuapp.com/api/v1/create-product', productos)
      .then((e) => {
        console.log(e);
        history.push('/');
      })
      .catch((e) => {
        console.log(e.response);
      });
  };
    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold"> Agregar Nuevo Producto </h2>
                        <form className="form-group" onSubmit={handleAdd}>
                            <div className="form-group">
                                <label htmlFor="name">Nombre</label>
                                <input
                                id="name"
                                className="form-control mb-3"
                                name="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="brand">Marca</label>
                                <input
                                id="brand"
                                className="form-control mb-3"
                                name="brand"
                                type="text"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                required
                                />
                            </div>
                            
                            
                            <div className="form-group">
                                <label htmlFor="precio">Precio</label>
                                <input
                                id="precio"
                                className="form-control mb-3"
                                name="precio"
                                type="text"
                                value={precio}
                                onChange={(e) => setPrecio(e.target.value)}
                                required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="stock">Stock</label>
                                <input
                                id="stock"
                                className="form-control mb-3"
                                name="stock"
                                type="text"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                required
                                />
                            </div>
                            
                            <div className="form-group">
                               <label htmlFor="image">Image</label>
                                <input
                                id="image"
                                className="form-control mb-3"
                                name="image"
                                type="file"
                                onChange={(e) => uploadFile(e.target.files[0])}
                                required
                                />
                            </div>

                            <button className="btn btn-primary font-weight-bold text-uppercase d-block w-100" type="submit">
                                Agregar
                            </button>
                            
                        </form>
                    </div>
                </div>

            </div>
            
        </div>
    )
}

export default NuevoProducto
