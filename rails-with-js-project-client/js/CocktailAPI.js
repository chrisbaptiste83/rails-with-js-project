class CocktailAPI {
    static getCocktails() {
      return fetch(`${CocktailAPI.base_url}/cocktail_recipes`).then(res => res.json())
    }
  }
  
  CocktailAPI.base_url = "http://localhost:3000"