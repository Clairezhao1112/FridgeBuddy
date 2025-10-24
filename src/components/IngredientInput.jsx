import React, { useState } from "react";

export default function IngredientInput({ ingredients, setIngredients }) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    const items = text.split(",").map(s => s.trim().toLowerCase()).filter(Boolean);
    if (items.length > 0) {
      setIngredients(items);
      setText("");
    }
  };

  const handleRemove = (index) => {
    setIngredients(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="input-section">
      <label className="input-label">What's in your fridge?</label>
      
      <div className="input-group">
        <input
          type="text"
          className="ingredient-input"
          placeholder="ingredients"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        <button onClick={handleAdd} className="btn btn-add">Add</button>
      </div>

      {ingredients.length > 0 && (
        <div className="ingredient-tags">
          {ingredients.map((ing, i) => (
            <span key={i} className="ingredient-tag">
              {ing}
              <button onClick={() => handleRemove(i)} className="tag-remove">×</button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
          }