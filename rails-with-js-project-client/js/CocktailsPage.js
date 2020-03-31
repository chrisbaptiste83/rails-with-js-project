class CocktailsPage {
  
    constructor(cocktails) {
      this.cocktails = cocktails
    }

    renderList() { 
      return this.cocktails.map(cocktail => {
        return cocktail.renderCard()
      }).join('') 
    }
  
    render() {
      return ` 
        <center>   
          <section id="index"> 
            <h1 class="f3 f1-m f-headline-l">Mike's Cantina</h1> 
            <button onclick = "this.disabled = true;" class="createCocktail f6 link dim br-pill ph3 pv2 mb2 dib white bg-black">Add Cocktail</button> 
          </section><br></br><br>
        </center> 
          <section id="cocktails">
            ${this.renderList()} 
          </section> 
        `
    }
  }