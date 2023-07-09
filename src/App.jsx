import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import List from "./components/List";
import Header from "./components/Header";
import "./App.scss";

const App = () => {

  const [list, setList] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedObject, setSelectedObject] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    (async function fetchData() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/products`);
        const products = await response.json();
        setList(products.data);
      } catch (error) {
        setError(`Ups! No se pudieron cargar los productos. Error: ${error}`);
      }
    })();
  }, []);

  const handleAddProduct = (object) => {
    setList([...list,object]);
    setShow(false);
  };

  const handleClick = (objectToEdit) => {
    setSelectedObject(objectToEdit);
    setShow(true);
  }

  const handleUpdateProduct = (editedProduct) => {
    setSelectedObject(editedProduct);
    const filteredList = list.filter((element) => element !== selectedObject);
    setList([...filteredList, editedProduct]);
    setShow(false);
    setSelectedObject(false);
  }

  const handleHide = () => setShow(false);

  const handleDelete = async (objectToDelete) => {
    const configFetch = { method: 'DELETE' }

    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/products/${objectToDelete.id}`, configFetch);
      const filteredList = list.filter((element) => element !== objectToDelete);
      setList(filteredList);
    } catch (error) {
      setError(`Ups! No se pudo eliminar el producto. Error: ${error}`);
    }
  }


  return (
    <div className="app">
      <Header />
      <div className="container__content">
        <List
          list={list}
          onClick={handleClick}
          onDelete={handleDelete}
          error={error}
        />
        {show && <Form
          onAddProduct={handleAddProduct}
          onUpdateProduct={handleUpdateProduct}
          objectToEdit={selectedObject}
          onHandleHide={handleHide}
        />}
      </div>
    </div>
  );
}

export default App;
