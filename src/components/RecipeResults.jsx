import React from "react";
import { MOODS } from "../utils/constants.js";

export default function RecipeResults({ recipes, mood }) {
  if (!recipes) return null;

  if (recipes.length === 0) {
    return (
      <div className="no-results">
        No recipes found. Try different ingredients!
      </div>
    );
  }
  /* Displays a grid of recipe cards based on the fetched data.
  Includes images, ingredient counts, and a link to each recipe
  Handles cases where no recipes are found
  */
  return (
    <div className="results-section">
      <h2 className="results-title">
        {mood && `${MOODS.find(m => m.id === mood)?.label} `}
        Recipe Ideas ({recipes.length})
      </h2>
      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            {recipe.image && (
              <img 
                src={recipe.image} 
                alt={recipe.title} 
                className="recipe-image" 
              />
            )}
            <div className="recipe-content">
              <h3 className="recipe-title">{recipe.title}</h3>
              <div className="recipe-badges">
                <span className="badge badge-used">
                  ✓ {recipe.usedIngredientCount} ingredients
                </span>
                <span className="badge badge-missed">
                  + {recipe.missedIngredientCount} more
                </span>
              </div>
              <a
                href={`https://spoonacular.com/recipes/${encodeURIComponent(recipe.title)}-${recipe.id}`}
                target="_blank"
                rel="noreferrer"
                className="recipe-link"
              >
                View Recipe →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}