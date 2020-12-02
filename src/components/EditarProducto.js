import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const EditarProducto = ({ history }) => {
  const { state } = useLocation();

  const { name, price, stock, brand, _id } = state.article;

  const [preci, setPrecio] = useState(price);
  const [stoc, setStock] = useState(stock);
  const [nam, setName] = useState(name);
  const [bran, setBrand] = useState(brand);
  const [image, setImage] = useState("");

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

  const handleEdit = (e) => {
    e.preventDefault();

    const newArticle = {
      product_id: _id,
      name: nam,
      brand: bran,
      price: parseFloat(preci),
      stock: parseInt(stoc),
      data: image,
    };

    console.log(newArticle);

    axios
      .put(`https://laboratorio9.herokuapp.com/api/v1/update-product`, newArticle)
      .then((e) => {
        console.log(e);
        history.push("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              {" "}
              Editar Producto{" "}
            </h2>
            <form className="form-group" onSubmit={handleEdit}>
              <div className="form-group">
                <label htmlFor="descripcion">Nombre</label>
                <input
                  id="name"
                  className="form-control mb-3"
                  name="name"
                  type="text"
                  value={nam}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="descripcion">Marca</label>
                <input
                  id="brand"
                  className="form-control mb-3"
                  name="brand"
                  type="text"
                  value={bran}
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
                  value={preci}
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
                  value={stoc}
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
                />
              </div>

              <button className="btn btn-primary font-weight-bold text-uppercase d-block w-100" type="submit">
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarProducto;
