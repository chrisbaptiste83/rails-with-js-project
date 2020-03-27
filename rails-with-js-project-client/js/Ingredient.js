class Ingredient {
    constructor({id, name, cocktail_recipe_id}) {
      this.id = id
      this.name = name
      this.cocktail_recipe_id = cocktail_recipe_id 
    }
  
    static findOrCreateBy(attributes) {
      let found = Ingredient.all.find(ingredient => ingredient.id == attributes.id)
      return found ? found : new Ingredient(attributes).save()
    } 

    static addIngredientField(){
      return ` 
      <form class="addIngredient">
        <p>
          <h3><label class="db">Ingredient Name:</label></h3>
          <input type="text" class="db w-60" name="ingredient" id="ingredient[name]" /><br> 
        </p>   
          <input type="submit" value="Add Ingredient to Cocktail" />  
      </form>
    ` 
    } 

    static create(ingredientAttributes) {
      return CocktailAPI.createIngredient(ingredientAttributes)
        .then(ingredientJSON => {
          return new Ingredient(ingredientJSON).save()
        })
    }  
  
    save() {
      Ingredient.all.push(this)
      return this
    }
  
    render() {
      return `
        <li class="f3 light-gray fw4 mt2 black-60">${this.name}</li>
      `
    }
  
  }
  
  Ingredient.all = []