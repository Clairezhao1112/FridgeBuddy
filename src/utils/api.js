export const API_BASE = "https://api.spoonacular.com";

export async function fetchRecipes(ingredients, mood, MOODS) {
  const apiKey = import.meta.env.VITE_SPOONACULAR_KEY;
  if (!apiKey) {
    throw new Error("Missing API key (VITE_SPOONACULAR_KEY).");
  }

  //Uses Spoonacular's `complexSearch` for mood filters
  const moodCfg = MOODS.find(m => m.id === mood)?.filters;
  let url, source;

  if (moodCfg) {
    url = new URL(`${API_BASE}/recipes/complexSearch`);
    url.searchParams.set("apiKey", apiKey);
    url.searchParams.set("number", "20");
    url.searchParams.set("addRecipeInformation", "true");
    url.searchParams.set("fillIngredients", "true");
    url.searchParams.set("includeIngredients", ingredients.join(","));
    if (moodCfg.sort) url.searchParams.set("sort", moodCfg.sort);
    if (moodCfg.maxReadyTime) url.searchParams.set("maxReadyTime", String(moodCfg.maxReadyTime));
    if (moodCfg.diet) url.searchParams.set("diet", moodCfg.diet);
    if (moodCfg.type) url.searchParams.set("type", moodCfg.type);
    source = "complexSearch";
    //  Default search using `findByIngredients` endpoint (no mood selected) 
  } else {
    url = new URL(`${API_BASE}/recipes/findByIngredients`);
    url.searchParams.set("apiKey", apiKey);
    url.searchParams.set("ingredients", ingredients.join(","));
    url.searchParams.set("number", "20");
    url.searchParams.set("ranking", "1");
    url.searchParams.set("ignorePantry", "true");
    source = "findByIngredients";
  }
  // checking API retrieval e.g. 402 = quota exceeded
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`API ${res.status}`);

  const data = await res.json();
  let list;
  // Normalize results so both endpoints return the same shape
  if (source === "complexSearch") {
    list = (data.results || []).map(r => ({
      id: r.id,
      title: r.title,
      image: r.image,
      usedIngredients: r.usedIngredients ?? [],
      missedIngredients: r.missedIngredients ?? [],
      usedIngredientCount: r.usedIngredients?.length ?? 0,
      missedIngredientCount: r.missedIngredients?.length ?? 0,
      readyInMinutes: r.readyInMinutes,
      pricePerServing: r.pricePerServing,
    }));
  } else {
    list = data;
  }
// Broke Mood: sort recipes so the cheapest ones come first
let finalList = list;
if (mood === "broke") {
  finalList = [...list].sort((a, b) => {
    const priceA = a.pricePerServing || Infinity;
    const priceB = b.pricePerServing || Infinity;
    return priceA - priceB;
  });
}

return finalList;

}