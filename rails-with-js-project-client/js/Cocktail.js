class Cocktail {
    constructor({ id, title, directions, description, image_url}) {
      this.id = id
      this.title = title 
      this.directions = directions
      this.description = description
      this.image_url = image_url 
    }
  

    static getAll() {
        if(Cocktail.all.length === 0) {
          return CocktailAPI.getCocktails().then(cocktails => { 
            Cocktail.all = cocktails.map(cocktailAttributes => 
              new Cocktail(cocktailAttributes)
            ) 
            return Cocktail.all
          })
        } else {
          return Promise.resolve(Cocktail.all)
        }
    } 

    getCocktailDetails() {
        if(this.ingredients().length === 0) {
          return CocktailAPI.getCocktailShow(this.id)
            .then(({ingredients}) => {
                ingredients.map(ingredientAttributes => Ingredient.findOrCreateBy(ingredientAttributes)) 
                return this
            })   
        } else {
          return Promise.resolve(this)
        }
    }
    
    deleteCocktail(){
      return fetch(`${CocktailAPI.base_url}/cocktail_recipes/${cocktailId}`,{
        method:'delete'
      }) 
    }

    static findById(id) {
        return Cocktail.all.find(cocktail => cocktail.id == id)
    }
     
    static create(cocktailAttributes) {
        return CocktailAPI.createCocktail(cocktailAttributes)
          .then(cocktailJSON => {
            return new Cocktail(cocktailJSON).save()
          })
    }  

    save() {
      Cocktail.all.push(this)
       return this
    }  

    ingredients(){ 
      return Ingredient.all.filter(ingredient => ingredient.cocktail_recipe_id == this.id)
    }   
  
    renderCard() {
      let article = document.createElement('article')
      article.className = "pa4-ns fl w-25-ns pv3-ns"
      article.innerHTML = `
        <div class="aspect-ratio aspect-ratio--1x1">
          <img style="background-image:url(${this.image_url});" 
          class="br4 db bg-center cover aspect-ratio--object" />
        </div>
          <h2 class="f5 f4-ns mb0 light-gray">${this.title}</h3>
        <p><a href="#/cocktail_recipes/${this.id}" class="cocktailShow f6 br-pill ph3 pv2 mb2 dib bg-gray link" data-cocktailid="${this.id}">Cocktail Details</a></p>
      `
      return article.outerHTML
    }
  } 

  Cocktail.all = []
