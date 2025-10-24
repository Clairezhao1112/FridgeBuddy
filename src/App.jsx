import React, { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import IngredientInput from "./components/IngredientInput.jsx"; 
import MoodPicker from "./components/MoodPicker.jsx";
import RecipeResults from "./components/RecipeResults.jsx";
import { MOODS } from "./util/constants.js";
import "./App.css";

console.log("App component loaded");

export default function App() {
  const [ingredients, setIngredients] = useState([]);
  const [mood, setMood] = useState("");
  const [recipes, setRecipes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (ingredients.length === 0) return; 

    const apiKey = import.meta.env.VITE_SPOONACULAR_KEY;
    if (!apiKey) {
      setError("Missing API key in .env file (VITE_SPOONACULAR_KEY). Restart dev server after adding it.");
      return;
    }

    const moodConfig = MOODS.find((m) => m.id === mood);
    const params = new URLSearchParams({
      ingredients: ingredients.join(","),
      number: "20",
      ranking: "1",
      ignorePantry: "true",
      apiKey,
      ...(moodConfig?.filters || {}),
    });

    setLoading(true);
    setError(null);

    fetch(`https://api.spoonacular.com/recipes/findByIngredients?${params}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(`API Error: ${res.status}`)))
      .then((data) => setRecipes(Array.isArray(data) ? data.slice(0, 6) : []))
      .catch((err) => setError(err.message || String(err)))
      .finally(() => setLoading(false));
  }, [ingredients, mood]);

  return (
    <div className="app-container">
      <div className="app-wrapper">
        <Header />

        <IngredientInput
          ingredients={ingredients}
          setIngredients={setIngredients}
        />

        <MoodPicker mood={mood} setMood={setMood} />

        {error && <div className="error-message">⚠️ {error}</div>}
        {loading && <div className="loading-message">🔍 Finding recipes...</div>}

        <RecipeResults recipes={recipes} mood={mood} />
      </div>
    </div>
  );
}