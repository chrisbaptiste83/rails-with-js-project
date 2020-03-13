document.addEventListener('DOMContentLoaded', () => {
    let root = document.getElementById('root')
    root.innerHTML = new CocktailsPage().render()
  })