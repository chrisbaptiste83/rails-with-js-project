class CocktailAPI {

    static getCocktails() {
      return fetch(`${CocktailAPI.base_url}/cocktail_recipes`).then(res => res.json())
    } 

    static getIngredients() {
      return fetch(`${CocktailAPI.base_url}/ingredients`).then(res => res.json())
    } 

    static getCocktailShow(cocktailId) {
      return fetch(`${CocktailAPI.base_url}/cocktail_recipes/${cocktailId}`)
        .then(res => res.json()) 
        .then(json => { 
          const { 
            data: {  
              id,
              attributes: {
                title, 
                description, 
                directions, 
                image_url
              }
            },
            included
          } = json 
          return {
            id,
            title,
            description, 
            directions,
            image_url,
            ingredients: included.map(({id, attributes: {name, cocktail_recipe_id}}) => {
              return {
                id,
                name, 
                cocktail_recipe_id
              }
            })
          }  
      })
  } 

    static createCocktail(cocktailAttributes) {
      return fetch(`${CocktailAPI.base_url}/cocktail_recipes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(cocktailAttributes)
      })
        .then(res => res.json())
    }

    static createIngredient(ingredientAttributes) { 
      return fetch(`${CocktailAPI.base_url}/ingredients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(ingredientAttributes)
      })
        .then(res => res.json())
    } 
    

  }  
    CocktailAPI.base_url = "http://localhost:3000"