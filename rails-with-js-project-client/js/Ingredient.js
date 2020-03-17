class Ingredient {
    constructor({id, name, cocktail_recipe_id}) {
      this.id = id
      this.name = name
      this.cocktail_recipe_id = cocktail_recipe_id 
    }
  
    static findOrCreateBy(attributes) {
      // if we find a track with the same id as the id in attributes, then return that track, if not create a track, add it to Track.all and return it.
      let found = Ingredient.all.find(ingredient => ingredient.id == attributes.id)
      return found ? found : new Ingredient(attributes).save()
    }
  
    save() {
      Ingredient.all.push(this)
      return this
    }
  
    render() {
      return `
        <li>${this.name}</li>
      `
    }
  
  }
  
  Ingredient.all = []