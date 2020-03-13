class Cocktail {
    constructor({ id, title, directions, description, image_url}) {
      this.id = id
      this.title = title 
      this.directions = directions
      this.description = description
      this.image_url = image_url
      
    }
  
    imageHtml() {
      return `<img src="${this.image_url}" />`
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
  
    renderCard() {
      let article = document.createElement('article')
      article.class = "fl w-100 w-50-m  w-25-ns pa2-ns"
      article.innerHTML = `
        <div class="aspect-ratio aspect-ratio--1x1">
          <img style="background-image:url(${this.image_url});" 
          class="db bg-center cover aspect-ratio--object" />
        </div>
        <a href="#0" class="ph2 ph0-ns pb3 link db">
          <h3 class="f5 f4-ns mb0 black-90">${this.title}</h3>
          <h3 class="f6 f5 fw4 mt2 black-60">${this.description}</h3>
        </a>
        <p><button class="editAlbum" data-id="${this.id}">Edit Album</button></p>
      `
      return article
    }
  } 

  let mojito = new Cocktail({
      id: 1, 
      title: "Mojito", 
      directions: "Mix Well", 
      description: "Best", 
      image_url: "https://tipsybartender.com/wp-content/uploads/2018/03/winter-solstice-300x300.jpg"
  })