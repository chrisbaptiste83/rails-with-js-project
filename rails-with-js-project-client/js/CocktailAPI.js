class CocktailAPI {
    static getCocktails() {
      return fetch(`${CocktailAPI.base_url}/cocktail_recipes`).then(res => res.json())
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
  }  
    CocktailAPI.base_url = "http://localhost:3000"