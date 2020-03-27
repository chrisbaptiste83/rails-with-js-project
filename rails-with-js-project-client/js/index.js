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
    if(e.target.matches('.addCocktail')) { 
        document.querySelector('#index').insertAdjacentHTML('beforeend', AddCocktail.renderForm())
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
        Cocktail.getAll().then(cocktails => {
          root.innerHTML = new CocktailsPage(cocktails).render()
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

  })       
})


const loadingGif = () => {
  let loading = document.createElement('img')
  loading.src = 'https://i.giphy.com/media/y1ZBcOGOOtlpC/giphy.webp'
  return loading.outerHTML 
} 

  