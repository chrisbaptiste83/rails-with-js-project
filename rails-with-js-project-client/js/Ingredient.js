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