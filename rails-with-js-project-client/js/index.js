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
    if(e.target.matches('.cocktailsIndex')) {
        root.innerHTML = new CocktailsPage(Cocktail.all).render()
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
  })       
})


const loadingGif = () => {
  let loading = document.createElement('img')
  loading.src = 'https://i.giphy.com/media/y1ZBcOGOOtlpC/giphy.webp'
  return loading.outerHTML
} 

  