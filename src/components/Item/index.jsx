import React from "react";

const Item = (props) => {

  const { name, color, category, price, onClick, onDelete } = props;

  return (
    <tr>
      <td>{name}</td>
      <td>{color}</td>
      <td>{category}</td>
      <td>{price}</td>
      <td className="buttonED">
        <button className="buttonEditDelete" onClick={onClick}>Edit</button>
        <button className="buttonEditDelete" onClick={onDelete}>Delete</button>
      </td>
    </tr>
  );
};

export default Item;
