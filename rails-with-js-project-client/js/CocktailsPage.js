class CocktailsPage {

    constructor(cocktails) {
      this.cocktails = cocktails
    }
  
    renderForm() {
      return `
        <form class="addCocktail">
          <h2>Add Cocktail Recipe:</h2>
          <p>
            <h2><label class="db">Title</label></h2>
            <input type="text" name="title" id="title" />
          </p>
          <p>
            <h2><label class="db">Description</label></h2>
            <input type="text" name="description" id="artist_name" />
          </p> 
          <p>
            <h2><label class="db">Directions</label></h2>
            <input type="text" name="directions" id="directions" />
          </p> 
          <p>
            <h2><label class="db">Image URL:</label></h2>
            <input type="text" name="image_url" id="image_url" />
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
      <center>
        <h1>Welcome to Chris's Cocktails</h1> 
      </center>     
        ${this.renderForm()} 
        <section id="cocktails">
          ${this.renderList()} 
        </section> 
      `
    }
  }