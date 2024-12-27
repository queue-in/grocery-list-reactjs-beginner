import React, { useState } from "react";
import "./Item.css";
import PinItem from "./PinItem"; // Import PinItem
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const Item = ({
  id,
  item,
  quantityWithUnit,
  category, // Add category prop
  list,
  setEdit,
  setEditId,
  setItem,
  setQuantityWithUnit,
  setList,
  complete,
}) => {
  const [editingItem, setEditingItem] = useState(false);
  const [editingQuantityWithUnit, setEditingQuantityWithUnit] = useState(false);
  const [newItem, setNewItem] = useState(item);
  const [newQuantityWithUnit, setNewQuantityWithUnit] = useState(quantityWithUnit);

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

  // Handle item editing
  const handleItemEdit = () => {
    setEditingItem(true);
  };

  const saveItemChanges = () => {
    setList(
      list.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            item: newItem,
          };
        }
        return el;
      })
    );
    setEditingItem(false);
  };

  // Handle quantity + unit editing
  const handleQuantityWithUnitEdit = () => {
    setEditingQuantityWithUnit(true);
  };

  const saveQuantityWithUnitChanges = () => {
    setList(
      list.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            quantityWithUnit: newQuantityWithUnit,
          };
        }
        return el;
      })
    );
    setEditingQuantityWithUnit(false);
  };

  return (
    <div className="item" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
      {/* Editable Item Name */}
      <div>
        {editingItem ? (
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onBlur={saveItemChanges}
            autoFocus
            style={{
              border: "none",
              outline: "none",
              backgroundColor: "transparent",
              color: "white",
              fontSize: "20px",
              flex: 1,
            }}
          />
        ) : (
          <span
            onClick={handleItemEdit}
            style={{
              cursor: "pointer",
              color: "white",
              fontSize: "20px",
            }}
          >
            {item}
          </span>
        )}
      </div>

      {/* Editable Quantity and Unit */}
      <div>
        {editingQuantityWithUnit ? (
          <input
            type="text"
            value={newQuantityWithUnit}
            onChange={(e) => setNewQuantityWithUnit(e.target.value)}
            onBlur={saveQuantityWithUnitChanges}
            autoFocus
            style={{
              border: "none",
              outline: "none",
              backgroundColor: "transparent",
              color: "white",
              fontSize: "16px",
              marginLeft: "10px",
            }}
          />
        ) : (
          <span
            onClick={handleQuantityWithUnitEdit}
            style={{
              cursor: "pointer",
              marginLeft: "10px",
              fontSize: "16px",
              color: "white",
            }}
          >
            {quantityWithUnit}
          </span>
        )}
      </div>

      {/* Display Category */}
      <div>
        <span
          style={{
            fontSize: "14px",
            color: "#ffc107", // Yellow color for the category
            fontWeight: "bold",
          }}
        >
          {category}
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

      {/* Edit Item (via pencil icon) */}
      <FontAwesomeIcon
        icon={faPencilAlt}
        style={{ cursor: "pointer", marginLeft: "10px", color: "#ffc107" }}
        onClick={() => {
          setItem(item);
          setQuantityWithUnit(quantityWithUnit);
          setEdit(true);
          setEditId(id);
        }}
        title="Edit item"
      />

      {/* Delete Item (via trash icon) */}
      <FontAwesomeIcon
        icon={faTrashAlt}
        style={{ cursor: "pointer", marginLeft: "10px", color: "#dc3545" }}
        onClick={() => {
          const confirmBox = window.confirm("Are you sure you want to delete this item?");
          if (confirmBox === true) {
            remove(id);
          }
        }}
        title="Delete item"
      />
    </div>
  );
};

export default Item;
