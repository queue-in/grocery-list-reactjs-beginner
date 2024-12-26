import React, { useState } from "react";
import "./App.css";
import Item from "./components/Item";
import { v4 as uuidv4 } from "uuid";

const arr = () => {
  let data = localStorage.getItem("data");
  if (data) return JSON.parse(localStorage.getItem("data"));
  else return [];
};

function App() {
  const [item, setItem] = useState("");
  const [quantityWithUnit, setQuantityWithUnit] = useState(""); // Combined field for quantity and unit
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [list, setList] = useState(arr);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    const newItem = {
      id: uuidv4(),
      item: item,
      quantityWithUnit: quantityWithUnit, // Save as one field
      complete: false,
    };
    e.preventDefault();

    if (item && item.length <= 25 && !edit) {
      setList([...list, newItem]);
      setItem("");
      setQuantityWithUnit("");
      setError("");
    } else if (item && item.length <= 25 && edit && editId) {
      setList(
        list.map((el) => {
          if (el.id === editId) {
            return { ...el, item: item, quantityWithUnit: quantityWithUnit };
          }
          return el;
        })
      );
      setItem("");
      setQuantityWithUnit("");
      setEditId(null);
      setEdit(false);
      setError("");
    } else if (!item) {
      setError("Item cannot be blank.");
    } else if (item.length > 25) {
      setError("Character limit is 25.");
    }
  };

  React.useEffect(() => {
    localStorage.setItem("data", JSON.stringify(list));
  }, [list]);

  const handleChange = (e) => {
    setItem(e.target.value);
  };

  return (
    <div className="App">
      <h1>Grocery List</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          value={item}
          placeholder="Enter the item name"
          onChange={handleChange}
        />
        <input
          className="input"
          type="text"
          value={quantityWithUnit}
          placeholder="Quantity and Unit (e.g., 2kg, 5 liters)"
          onChange={(e) => setQuantityWithUnit(e.target.value)}
        />
        {edit ? (
          <button className="btn" type="submit">
            Edit Item
          </button>
        ) : (
          <button className="btn" type="submit">
            Add Item
          </button>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      <div>
        {list.map((el) => (
          <Item
            key={el.id}
            id={el.id}
            item={el.item}
            quantityWithUnit={el.quantityWithUnit} // Pass combined field
            list={list}
            setList={setList}
            setEdit={setEdit}
            setEditId={setEditId}
            setItem={setItem}
            setQuantityWithUnit={setQuantityWithUnit}
            complete={el.complete}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
