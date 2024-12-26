import React from "react";
import "./Item.css";
import PinItem from "./PinItem"; // Import PinItem
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const Item = ({
  id,
  item,
  quantityWithUnit,
  list,
  setEdit,
  setEditId,
  setItem,
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
      list.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            complete: !el.complete,
          };
        }
        return el;
      })
    );
  };

  return (
    <div
      className="item"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      {/* Item Name */}
      <div
        style={{
          display: "flex",
          justifyContent:"space-between",
          flex: 1,
        }}
      >
        <span
          style={{
            color: "white",
            fontSize: "20px",
          }}
          className={complete ? "complete" : ""}
        >
          {item}
        </span>
        <span
          style={{
            color: "#ccc",
            fontSize: "16px",
            marginTop: "5px",
          }}
        >
          {quantityWithUnit}
        </span>
      </div>

      {/* Checkbox for completing an item */}
      <input
        type="checkbox"
        checked={complete}
        onChange={() => handleComplete(id)}
        style={{ cursor: "pointer" }}
        aria-label="Mark item complete"
      />

      {/* Pin Item */}
      <PinItem id={id} list={list} setList={setList} />

      {/* Edit Item */}
      <FontAwesomeIcon
        icon={faPencilAlt}
        style={{ cursor: "pointer", marginLeft: "10px", color: "#ffc107" }}
        onClick={() => {
          setItem(item);
          setEdit(true);
          setEditId(id);
        }}
        title="Edit item"
      />

      {/* Delete Item */}
      <FontAwesomeIcon
        icon={faTrashAlt}
        style={{ cursor: "pointer", marginLeft: "10px", color: "#dc3545" }}
        onClick={() => {
          const confirmBox = window.confirm(
            "Are you sure you want to delete this item?"
          );
          if (confirmBox === true) {
            remove(id);
          }
        }}
        title="Delete item"
      />
    </div>
  );
}

export default Item;
