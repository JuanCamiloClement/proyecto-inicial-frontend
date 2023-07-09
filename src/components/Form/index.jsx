import React, { useState } from "react";
import "./Form.scss";

const Form = (props) => {

  const { onAddProduct, objectToEdit, onUpdateProduct, onHandleHide } = props;
  const [object, setObject] = useState({});
  const [editableObject, setEditableObject] = useState(objectToEdit);
  const [errorForm, setErrorForm] = useState(null)

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newObject = { ...object, [name]: value };
    const newEditedObject = { ...editableObject, [name]: value };
    { editableObject ? setEditableObject(newEditedObject) : setObject(newObject) }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const configFetch = {
      method: 'POST',
      body: JSON.stringify(object),
      headers: { 'Content-Type': 'application/json' }
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/products`, configFetch);
      const product = await response.json();
      onAddProduct(product.data);
    } catch (error) {
      setErrorForm(`Ups! No se pudo agregar el producto. Error: ${error}`);
    }

    setObject({});
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const configFetch = { method: 'PUT', body: JSON.stringify(editableObject), headers: { 'Content-Type': 'application/json' } }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/products/${editableObject.id}`, configFetch);
      const product = await response.json();
      onUpdateProduct(product.data);
    } catch (error) {
      setErrorForm(`Ups! No se pudo editar el producto. Error: ${error}`);
    }
  }

  if (errorForm) {
    return errorForm;
  }

  return (
    <div className="form_container">
      <section>

        <form action="" onSubmit={objectToEdit ? handleUpdate : handleSubmit} >
          <h2 className="titulos">{editableObject ? "Edit Product" : "Add Product"}</h2>
          <div className="container__content--form">

            <label htmlFor="name">PRODUCT NAME</label>

            <input
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Your product name"
              value={editableObject?.name}
            />

            <label htmlFor="color">COLOR</label>

            <input
              type="text"
              name="color"
              onChange={handleChange}
              placeholder="Silver, black, white, etc"
              value={editableObject?.color}
            />

            <label htmlFor="category">CATEGORY</label>

            <select name="category" onChange={handleChange} value={editableObject?.category}>
              <option value="Category"></option>
              <option value="Music">Music</option>
              <option value="Home">Home</option>
              <option value="Clothing">Clothing</option>
              <option value="Baby">Baby</option>
              <option value="Books">Books</option>
            </select>

            <label htmlFor="price">PRICE</label>

            <input
              type="number"
              name="price"
              onChange={handleChange}
              placeholder="$0000,00"
              value={editableObject?.price}
            />
            <div className="contenedor-botonesPrincipales">
              <button className="botonesPrincipales" onClick={onHandleHide}>
                Cancel
              </button>
              {editableObject ?
                <button className="botonesPrincipales botonesPrincipales-update" type="submit">
                  Update
                </button> :
                <button className="botonesPrincipales botonesPrincipales-add" type="submit">
                  Add
                </button>
              }

            </div>


          </div>

        </form>

      </section>
    </div>
  );
};

export default Form;
