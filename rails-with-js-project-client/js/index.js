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

class Cocktail {
  constructor({ id, title, directions, description, image_url}) {
    this.id = id
    this.title = title 
    this.directions = directions
    this.description = description
    this.image_url = image_url 
  }


  static getAll() {
      if(Cocktail.all.length === 0) {
        return CocktailAPI.getCocktails().then(cocktails => { 
          Cocktail.all = cocktails.map(cocktailAttributes => 
            new Cocktail(cocktailAttributes)
          ) 
          return Cocktail.all
        })
      } else {
        return Promise.resolve(Cocktail.all)
      }
  } 

  getCocktailDetails() {
      if(this.ingredients().length === 0) {
        return CocktailAPI.getCocktailShow(this.id)
          .then(({ingredients}) => {
              ingredients.map(ingredientAttributes => Ingredient.findOrCreateBy(ingredientAttributes)) 
              return this
          })   
      } else {
        return Promise.resolve(this)
      }
  }
  

  static findById(id) {
      return Cocktail.all.find(cocktail => cocktail.id == id)
  }
   
  static create(cocktailAttributes) {
      return CocktailAPI.createCocktail(cocktailAttributes)
        .then(cocktailJSON => {
          return new Cocktail(cocktailJSON).save()
        })
  } 
  
  save() {
    Cocktail.all.push(this)
     return this
  }  

  ingredients(){ 
    return Ingredient.all.filter(ingredient => ingredient.cocktail_recipe_id == this.id)
  } 

  renderCard() {
    let article = document.createElement('article')
    article.className = "pa4-ns fl w-25-ns pv3-ns"
    article.innerHTML = `
      <div class="aspect-ratio aspect-ratio--1x1">
        <img style="background-image:url(${this.image_url});" 
        class="br4 db bg-center cover aspect-ratio--object" />
      </div>
        <h2 class="f5 f4-ns mb0 light-gray">${this.title}</h3>
      <p><a href="#/cocktail_recipes/${this.id}" class="cocktailShow f6 br-pill ph3 pv2 mb2 dib bg-gray link" data-cocktail-id="${this.id}">Cocktail Details</a></p>  
    `
    return article.outerHTML
  }
} 

Cocktail.all = []

class CocktailAPI {

  static getCocktails() {
    return fetch(`${CocktailAPI.base_url}/cocktail_recipes`).then(res => res.json())
  } 

  static getIngredients() {
    return fetch(`${CocktailAPI.base_url}/ingredients`).then(res => res.json())
  } 

  static getCocktailShow(cocktailId) {
    return fetch(`${CocktailAPI.base_url}/cocktail_recipes/${cocktailId}`)
      .then(res => res.json()) 
      .then(json => { 
        const { 
          data: {  
            id,
            attributes: {
              title, 
              description, 
              directions, 
              image_url
            }
          },
          included
        } = json 
        return {
          id,
          title,
          description, 
          directions,
          image_url,
          ingredients: included.map(({id, attributes: {name, cocktail_recipe_id}}) => {
            return {
              id,
              name, 
              cocktail_recipe_id
            }
          })
        }  
      })
  } 

  static createCocktail(cocktailAttributes) {
    return fetch(`${CocktailAPI.base_url}/cocktail_recipes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(cocktailAttributes)
    })
      .then(res => res.json())
  }  
  static createIngredient(ingredientAttributes) { 
    return fetch(`${CocktailAPI.base_url}/ingredients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(ingredientAttributes)
    })
      .then(res => res.json())
  } 
  static deleteIngredient(cocktailId,ingredientId){ 
    return fetch(`${CocktailAPI.base_url}/cocktail_recipes/${cocktailId}/ingredients/${ingredientId}`,{
      method:'DELETE'
    }) 
      .then(res => res.json())
  }
}  

CocktailAPI.base_url = "http://localhost:3000"

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
      <h3 class="f4 light-gray f1-ns mb0 black-90">${this.cocktail.title}</h3><br></br>
      <div class="aspect-ratio aspect-ratio--1x1">
        <img style="background-image:url(${this.cocktail.image_url});" 
        class="br4 db bg-center cover aspect-ratio--object" />
      </div>
      <h1>Description:</h1>
      <h3 class="f4 light-gray f3 fw5 mt2 black-60">${this.cocktail.description}</h3> 
      <h1>Ingredients:</h1>
        <section id="ingredients"> 
            ${this.renderIngredientList()} 
            <button onclick = "this.disabled = true;" class="addIngredient f6 link dim br-pill ph3 pv2 mb2 dib white bg-black">Add Ingredient(s)</button>     
        </section>       
      <h1>Directions:</h1>
      <h3 class="f4 light-gray fw5 mt2 black-60">${this.cocktail.directions}</h3> 
      <p><a href="#" class="cocktailsIndex f6 br-pill ph3 pv2 mb2 dib bg-gray link">Back to Cocktails</a></p> 
    `
    return article.outerHTML 
  }
}

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

class Ingredient {
  constructor({id, name, cocktail_recipe_id}) {
    this.id = id
    this.name = name
    this.cocktail_recipe_id = cocktail_recipe_id 
  }

  static findOrCreateBy(attributes) {
    let found = Ingredient.all.find(ingredient => ingredient.id == attributes.id)
    return found ? found : new Ingredient(attributes).save()
  } 

  static addIngredientField(){
    return ` 
      <form class="addIngredient">
        <p>
          <h3><label class="db">Ingredient Name:</label></h3>
          <input type="text" class="db w-60" name="ingredient" id="ingredient" /><br> 
        </p>   
        <input type="submit" value="Add Ingredient to Cocktail" />  
      </form>
      ` 
  } 

  static addIngredientFields(){
    return ` 
      <form class="addCocktailIngredient">
        <p>
          <h3><label class="db">Ingredient Name:</label></h3>
          <input type="text" class="db w-60" name="ingredient" id="ingredient[name]" /><br>   
        </p> 
        <input type="submit" value="Add to Cocktail" />  
      </form></br>
      <p><a href="#/cocktail_recipes/${Cocktail.all[Cocktail.all.length-1].id}" class="seeCocktail f6 br-pill ph3 pv2 mb2 dib bg-gray link" data-cocktail-id="${Cocktail.all[Cocktail.all.length-1].id}">Go To Cocktail</a></p>   
      ` 
  } 
  static findById(id) {
    return Ingredient.all.find(ingredient => ingredient.id == id)
  }

  static create(ingredientAttributes) {
    return CocktailAPI.createIngredient(ingredientAttributes)
      .then(ingredientJSON => {
        return new Ingredient(ingredientJSON).save()
      })
  } 

  remove() { 
      return CocktailAPI.deleteIngredient(this.cocktail_recipe_id, this.id)
        .then(ingredient => {
          let newIngredients = Ingredient.all.filter(ing => ing.id != ingredient.id)
          Ingredient.all = newIngredients
        })   
  } 
  save() {
    Ingredient.all.push(this)
    return this
  }

  render() {
    return `
      <li class="f3 light-gray fw4 mt2 black-60">${this.name} <button class="deleteIngredient f6 link dim br-pill ph3 pv2 mb2 dib white bg-black" data-ingredient-id="${this.id}">Delete</button></li>
      
    `
  }

}

Ingredient.all = [] 

document.addEventListener('DOMContentLoaded', () => {
    let root = document.getElementById('root')
    root.innerHTML = loadingGif()
    Cocktail.getAll().then(cocktails => {
     root.innerHTML = new CocktailsPage(cocktails).render()
    })

  document.addEventListener('click', (e) => {
      if(e.target.matches('.cocktailShow')) {
          let cocktail = Cocktail.findById(e.target.dataset.cocktailId)
          cocktail.getCocktailDetails().then(cocktail => { 
            root.innerHTML = new CocktailShowPage(cocktail).render() 
          })  
      }
      if(e.target.matches('.seeCocktail')) { 
        let cocktail = Cocktail.findById(e.target.dataset.cocktailId)
        cocktail.getCocktailDetails().then(cocktail => { 
          root.innerHTML = new CocktailShowPage(cocktail).render() 
        })  
      }
      if(e.target.matches('.deleteIngredient')) { 
        let ingredient = Ingredient.findById(e.target.dataset.ingredientId)
        ingredient.remove()
          .then(ingredient => {
            cocktailIngredient = e.target.parentElement
            cocktailIngredient.remove() 
          }) 
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
      if(e.target.matches('.cocktailsIndex')) {
        Cocktail.getAll().then(cocktails => {
          root.innerHTML = new CocktailsPage(cocktails).render()
        })
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
          document.querySelector('#ingredients ul').insertAdjacentHTML('beforeend', ingredient.render())
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

  