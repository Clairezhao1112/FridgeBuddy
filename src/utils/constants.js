/*Based on the mood selected,  this builds different query parameters such as
 cooking time, diet type, meal category, or sort order
telling the Spoonacular API what kind of recipes to return for that mood.
*/
export const MOODS = [
    { id: "lazy", label: " Lazy", filters: { maxReadyTime: 20, sort: "time" } },
    { id: "broke", label: " Broke", filters: { maxPrice: 150, sort: "price" } },
    { id: "healthy", label: " Healthy", filters: { diet: "vegetarian", sort: "healthiness" } },
    { id: "comfort", label: " Comfort", filters: { type: "main course", sort: "popularity" } },
    { id: "adventurous", label: " Adventurous", filters: { sort: "random" } },
  ];