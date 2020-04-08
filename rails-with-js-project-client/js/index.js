document.addEventListener('DOMContentLoaded', () => {
    let root = document.getElementById('root')
    root.innerHTML = loadingGif()
    Cocktail.getAll().then(cocktails => {
     root.innerHTML = new CocktailsPage(cocktails).render()
    })

  document.addEventListener('click', (e) => {
      if(e.target.matches('.cocktailShow')) {
          let cocktail = Cocktail.findById(e.target.dataset.cocktailid)
          cocktail.getCocktailDetails().then(cocktail => { 
          root.innerHTML = new CocktailShowPage(cocktail).render() 
          })  
      }
      if(e.target.matches('.seeCocktail')) { 
        let lastCocktail = Cocktail.all[Cocktail.all.length-1]
        let cocktail = Cocktail.findById(lastCocktail.id)
        cocktail.getCocktailDetails().then(cocktail => { 
        root.innerHTML = new CocktailShowPage(cocktail).render() 
        })  
      }
      if(e.target.matches('.deleteIngredient')) {
        let cocktailId = document.URL.split('/')[5] 
        let cocktail = Cocktail.findById(cocktailId)
        let firstCocktailIngredient = cocktail.ingredients()[0] || cocktail.ingredients()[1]
        let ingredientId = firstCocktailIngredient.id 
        CocktailAPI.deleteIngredient(cocktailId,ingredientId)
            ingredient = document.querySelectorAll('#ingredients')[0].children[0].firstElementChild 
            ingredient.remove() 
      } 
      if(e.target.matches('.createCocktail')) { 
          document.querySelector('#index').insertAdjacentHTML('beforeend', AddCocktail.renderForm())
          } 
      if(e.target.matches('.addIngredients')) { 
          document.querySelector('#cocktailIngredients').insertAdjacentHTML('beforeend', Ingredient.addIngredientFields()) 
          }         
      if(e.target.matches('.addIngredient')) {
        document.querySelector('#ingredients').insertAdjacentHTML('beforeend', Ingredient.addIngredientField())
          }     
        }) 

  document.addEventListener('submit', (e) => {
      e.preventDefault()
      if(e.target.matches('.addCocktail')) {
          let formData = {}
          e.target.querySelectorAll('input[type="text"]').forEach(input => formData[input.id] = input.value) 
          Cocktail.create(formData)
          .then(cocktail => {
            document.querySelector('#cocktails').insertAdjacentHTML('beforeend', cocktail.renderCard())
          })  
      } 
      if(e.target.matches('.addIngredient')) {
        let ingredientData = {} 
        ingredientData.name = document.querySelector('input[type="text"]').value
        ingredientData.cocktail_recipe_id = document.URL.split('/')[5] 
        Ingredient.create(ingredientData)
          .then(ingredient => {
          document.querySelector('#ingredients').insertAdjacentHTML('afterbegin', ingredient.render())
          }) 
      }
      if(e.target.matches('.addCocktailIngredient')) { 
        let lastCocktail = Cocktail.all[Cocktail.all.length-1]
        let ingredientData ={} 
        ingredientData.name = document.querySelector('input[id="ingredient[name]"]').value 
        ingredientData.cocktail_recipe_id = lastCocktail.id 
        Ingredient.create(ingredientData)
          .then(ingredient => {
          document.querySelector('#cocktailIngredients').insertAdjacentHTML('afterbegin', ingredient.render())
          }) 
      } 
  })

})


const loadingGif = () => {
  let loading = document.createElement('img')
  loading.src = 'https://pro2-bar.myportfolio.com/v1/assets/22e12610-cb86-4f18-ba80-351583b814b3/5d462845-70f0-4dd5-a1a3-121610d90b40.gif?h=4dbfe7be606c82987095a68d711ac1cd'
  return `
    <center>
      ${loading.outerHTML}
      <h1>Making Cocktails...</h1>
    </center>
    `  
} 

  