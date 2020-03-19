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
      let article = document.createElement('article')
      article.className = "pa2-ns center w-40-ns pv2-ns"
      article.innerHTML = `
        <div class="aspect-ratio aspect-ratio--1x1">
          <img style="background-image:url(${this.cocktail.image_url});" 
          class="br4 db bg-center cover aspect-ratio--object" />
        </div>
        <h3 class="f4 light-gray f1-ns mb0 black-90">${this.cocktail.title}</h3>
        <h1>Description:</h1>
        <h3 class="f4 light-gray f3 fw5 mt2 black-60">${this.cocktail.description}</h3> 
        <h1>Ingredients:</h1> 
        ${this.renderIngredientList()}
        <h1>Directions:</h1>
        <h3 class="f4 light-gray fw5 mt2 black-60">${this.cocktail.directions}</h3> 
      `
      return article.outerHTML 
    }
  }