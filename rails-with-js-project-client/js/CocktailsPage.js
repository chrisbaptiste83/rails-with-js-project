class CocktailsPage {

    constructor(cocktails) {
      this.cocktails = cocktails
      this.formState = {
        title: '',
        description: '', 
        directions: ''
      }
    }
  
    renderForm() {
      return `
        <form class="addCocktail">
          <h3>Add a Cocktail Recipe</h3>
          <p>
            <label class="db">Title</label>
            <input type="text" name="title" value="${this.formState.title}" />
          </p>
          <p>
            <label class="db">Description</label>
            <input type="text" name="description" value="${this.formState.description}" />
          </p> 
          <p>
            <label class="db">Directions</label>
            <input type="text" name="directions" value="${this.formState.directions}" />
          </p>
          <input type="submit" value="Add Cocktail Recipe" />
        </form>
      `
    } 

    renderList() { 
      return this.cocktails.map(cocktail => {
        return cocktail.renderCard()
      
      }).join('') 
    }
  
  
    render() {
      return `
        <h1>Hello from the Cocktail Recipes Page</h1>
        ${this.renderForm()} 
        ${this.renderList()}
      `
    }
  }