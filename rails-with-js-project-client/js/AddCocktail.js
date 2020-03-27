class AddCocktail { 

    static renderForm() {
        return `
         <article class="center mw8 mw9-ns hidden ba mv4">
            <h1 class="f2 bg-near-black white mv0 pv2 ph3">Create a Cocktail:</h1>
            <div class="pa3 bt"> 
            <center> 
             <form class="addCocktail"> 
                <p>
                  <h2><label class="db">Title:</label></h2>
                  <input type="text" class="db w-60" name="title" id="title" />
                </p>
                <p>
                  <h2><label class="db">Description:</label></h2>
                  <input type="text" class="db w-60" name="description" id="description"></textarea>
                </p> 
                <p>
                  <h2><label class="db">Directions:</label></h2>
                  <input type="text" class="db w-60" name="directions" id="directions"></textarea>
                </p> 
                <p>
                  <h2><label class="db">Image URL:</label></h2>
                  <input type="text" class="db w-60 h--80" name="image_url" id="image_url" />
                </p>
                <input type="submit" value="Add Cocktail" />
             </form>
                </center>
            </div>
        </article>
          `
      } 

}