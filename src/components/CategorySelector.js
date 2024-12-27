import React from "react";

const CategorySelector = ({ category, setCategory }) => {
  return (
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
  );
};

export default CategorySelector;
