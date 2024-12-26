import React from "react";
import "./Item.css";

const Item = ({
  id,
  item,
  category, // Add category
  list,
  setEdit,
  setEditId,
  setItem,
  setCategory, // New state setter for category
  setList,
  complete,
}) => {
  // Delete Item
  const remove = (id) => {
    setList(list.filter((el) => el.id !== id));
  };

  // Mark Item completed
  const handleComplete = (id) => {
    setList(
      list.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            complete: !item.complete,
          };
        }
        return item;
      })
    );
  };

  // Edit Item
  const handleItem = (id) => {
    const editItem = list.find((el) => el.id === id);
    setItem(editItem.item);
    setCategory(editItem.category); // Set the current category
    setEdit(true);
    setEditId(id);
  };

  return (
    <div className="item">
      <div style={{ flexGrow: 1 }}>
        <input
          type="text"
          value={item}
          readOnly
          className={complete ? "complete" : ""}
        />
        <p style={{ color: "gray", fontSize: "14px" }}>Category: {category}</p>
      </div>
      <img
        src="https://img.icons8.com/emoji/36/000000/pencil-emoji.png"
        onClick={() => {
          const confirmBox = window.confirm("Do you want to edit this item?");
          if (confirmBox === true) {
            handleItem(id);
          }
        }}
        alt="edit item"
      />
      <img
        onClick={() => handleComplete(id)}
        src="https://img.icons8.com/offices/40/000000/checked-2--v2.png"
        alt="mark item complete"
      />
      <img
        onClick={() => {
          const confirmBox = window.confirm(
            "Are you sure you want to delete this item?"
          );
          if (confirmBox === true) {
            remove(id);
          }
        }}
        src="https://img.icons8.com/color/48/000000/trash.png"
        alt="delete item"
      />
    </div>
  );
};

export default Item;
