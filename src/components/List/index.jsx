import React from "react";
import Item from "../Item";
import "./List.scss";

const List = (props) => {
  const { list, onClick, onDelete, error } = props;

  if (error) {
    return error;
  }

  return (
    <article className="container__content--list">
      <div className="cabeza">
        <h2 className="titulos">Product List</h2>
        <button className="botonesPrincipales" id="buttonAdd" onClick={() => onClick()}>Add</button>
      </div>

      <table className="tabla">
        <colgroup>
          <col style={{ width: "30%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "10%" }} />
        </colgroup>
        <thead className="categorias">
          <tr>
            <th>PRODUCT NAME</th>
            <th>COLOR</th>
            <th>CATEGORY</th>
            <th>PRICE</th>
            <th>   </th>

          </tr>
        </thead>
        <tbody>
          {list.map((object, index) => {
            return (
              <Item
                key={object.id}
                id={object.id}
                name={object.name}
                color={object.color}
                category={object.category}
                price={object.price}
                onClick={() => onClick(object)}
                onDelete={() => onDelete(object)}
              />
            )
          }
          )}
        </tbody>
      </table>
    </article>
  );
};

export default List;