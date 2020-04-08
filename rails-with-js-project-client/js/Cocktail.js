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
    
    renderUpdateForm(){
      return `
            <article class="center mw8 mw9-ns hidden ba mv4">
                <h1 class="f3 bg-near-black white mv0 pv2 ph3">Edit Cocktail:</h1>
                <div class="pa3 bt"> 
                <center>
                <form class="updateCocktail"> 
                    <p>
                        <h2><label class="db">Title:</label></h2>
                        <input type="text" class="db w-60" name="title" id="title" value="${this.title}"/>
                    </p>
                    <p>
                        <h2><label class="db">Description:</label></h2>
                        <input type="text" class="db w-60" name="description" id="description" value="${this.description}"/>
                    </p> 
                    <p>
                        <h2><label class="db">Directions:</label></h2>
                        <input type="text" class="db w-60" name="directions" id="directions" value="${this.directions}"/>
                    </p> 
                    <p>
                        <h2><label class="db">Image URL:</label></h2>
                        <input type="text" class="db w-60 h--80" name="image_url" id="image_url" value="${this.image_url}"/>
                    </p>
                        <input type="submit" value="Edit Cocktail"/></br><br>
                </form>
                <section id="cocktailIngredients"> 
                    </br><button onclick = "this.disabled = true;" class="addIngredients f6 link dim br-pill ph3 pv2 mb2 dib white bg-black">Add Ingredient(s)</button>
                </section>
                </center>
                </div>
            </article>
            `
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
