import React, { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import IngredientInput from "./components/IngredientInput.jsx"; 
import MoodPicker from "./components/MoodPicker.jsx";
import RecipeResults from "./components/RecipeResults.jsx";
import { MOODS } from "./utils/constants.js";
import { fetchRecipes } from "./utils/api.js";
import "./App.css";

export default function App() {
  const [ingredients, setIngredients] = useState([]);
  const [mood, setMood] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //Reset state when ingredients are cleared (no API call)
  useEffect(() => {
    if (ingredients.length === 0) {
      setRecipes([]);
      setError(null);
      setLoading(false);
    }
  }, [ingredients]);

  //Fetch new recipes when ingredients or mood change (calls fetchRecipes)
  useEffect(() => {
    if (ingredients.length === 0) return;

    const getData = async () => {
      try {
        setLoading(true);
        setError(null);
        const results = await fetchRecipes(ingredients, mood, MOODS);
        setRecipes(results);
      } catch (e) {
        setError(e.message || "Request failed");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [ingredients, mood]);

  //Main app layout 
  return (
    <div className="app-container">
      <div className="app-wrapper">
        <Header />
        <IngredientInput ingredients={ingredients} setIngredients={setIngredients} />
        <MoodPicker mood={mood} setMood={setMood} />
        {error && <div className="error-message">⚠️ {error}</div>}
        {loading && <div className="loading-message">🔍 Finding recipes...</div>}
        <RecipeResults recipes={recipes} mood={mood} />
      </div>
    </div>
  );
}

