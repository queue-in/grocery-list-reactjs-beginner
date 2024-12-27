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
  const [quantityWithUnit, setQuantityWithUnit] = useState(""); 
  const [category, setCategory] = useState("Fruit"); 
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [list, setList] = useState(arr);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      id: uuidv4(),
      item: item,
      quantityWithUnit: quantityWithUnit, 
      category: category, 
      complete: false,
    };

    if (item && item.length <= 25 && !edit) {
      setList([...list, newItem]);
      setItem("");
      setQuantityWithUnit("");
      setCategory("Fruit"); 
      setError("");
    } else if (item && item.length <= 25 && edit && editId) {
      setList(
        list.map((el) => {
          if (el.id === editId) {
            return {
              ...el,
              item: item,
              quantityWithUnit: quantityWithUnit,
              category: category, 
            };
          }
          return el;
        })
      );
      setItem("");
      setQuantityWithUnit("");
      setCategory("Fruit"); 
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
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input"
        >
          <option value="Fruit">Fruit</option>
          <option value="Vegetable">Vegetable</option>
          <option value="Drink">Drink</option>
          <option value="Ingredient">Ingredient</option>
          <option value="Others">Others</option>
        </select>
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
            quantityWithUnit={el.quantityWithUnit} 
            category={el.category} 
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
