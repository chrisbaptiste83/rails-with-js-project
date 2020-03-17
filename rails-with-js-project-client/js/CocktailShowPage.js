class CocktailShowPage {
    constructor(cocktail) {
      this.cocktail = cocktail
    }
  
    renderIngredientList() {
      let ul = document.createElement('ul') 
      this.cocktail.ingredients().forEach(ingredient => {
        ul.insertAdjacentHTML('beforeend', ingredient.render())
      })
      return ul.outerHTML
    }
  
    render() {
      return `
      <div class="aspect-ratio aspect-ratio--1x1">
        <img style="background-image:url(${this.cocktail.image_url});" 
        class="db bg-center cover aspect-ratio--object" />
      </div>
      <div class="ph2 ph0-ns pb3 link db">
        <h2 class="f5 f4-ns mb0 black-90">${this.cocktail.title}</h2>
        <h2>Description:</h2>
        <h3 class="f6 f5 fw4 mt2 black-60">${this.cocktail.description}</h3> 
        <h2>Directions:</h2>
        <h3 class="f6 f5 fw4 mt2 black-60">${this.cocktail.directions}</h3>
      </div> 
      <h2>Ingredients:</h2>
      ${this.renderIngredientList()}
      `
    }
  }