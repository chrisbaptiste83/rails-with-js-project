class AddCocktail { 

    static renderForm() {
        return `
            <article class="center mw8 mw9-ns hidden ba mv4">
                <h1 class="f3 bg-near-black white mv0 pv2 ph3">Create Cocktail First, Then Add ingredient(s):</h1>
                <div class="pa3 bt"> 
                <center>
                <form class="addCocktail"> 
                    <p>
                        <h2><label class="db">Title:</label></h2>
                        <input type="text" class="db w-60" name="title" id="title"/>
                    </p>
                    <p>
                        <h2><label class="db">Description:</label></h2>
                        <input type="text" class="db w-60" name="description" id="description"/>
                    </p> 
                    <p>
                        <h2><label class="db">Directions:</label></h2>
                        <input type="text" class="db w-60" name="directions" id="directions"/>
                    </p> 
                    <p>
                        <h2><label class="db">Image URL:</label></h2>
                        <input type="text" class="db w-60 h--80" name="image_url" id="image_url"/>
                    </p>
                        <input type="submit" value="Create Cocktail"/></br><br>
                </form>
                <section id="cocktailIngredients"> 
                    </br><button onclick = "this.disabled = true;" class="addIngredients f6 link dim br-pill ph3 pv2 mb2 dib white bg-black">Add Ingredient(s)</button>
                </section>
                </center>
                </div>
            </article>
            `
      } 

}