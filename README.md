# Cocktail Recipe App

A full-stack cocktail recipe manager built with a **Rails API** backend and a **vanilla JavaScript** single-page frontend. Browse cocktail recipes, view their ingredients, and create your own concoctions — all without ever leaving the page.

## Features

- View all cocktail recipes on load
- Click into any cocktail to see its ingredients
- Create new cocktail recipes with a title, description, directions, and image
- Add ingredients to an existing cocktail
- Fully dynamic UI — no page reloads

## Screenshots

> ![Cocktail App](rails-with-js-project-client/Bar3.jpg)

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Ruby on Rails 6 (API mode) |
| Frontend | Vanilla JavaScript (ES6 classes) |
| Styling | [Tachyons CSS](https://tachyons.io/) |
| Serialization | ActiveModel Serializers |
| Database | SQLite (development) |

## Project Structure

```
├── rails-with-js-project-api/    # Rails API backend
│   ├── app/
│   │   ├── controllers/          # CocktailRecipesController, IngredientsController
│   │   ├── models/               # CocktailRecipe (has_many :ingredients)
│   │   └── serializers/          # JSON serializers
│   └── ...
└── rails-with-js-project-client/ # Vanilla JS frontend
    ├── index.html
    ├── main.css
    └── js/
        └── index.js              # Cocktail, Ingredient, CocktailAPI, AddCocktail classes
```

## Getting Started

### Backend

```bash
cd rails-with-js-project-api
bundle install
rails db:create db:migrate db:seed
rails server
```

The API runs on `http://localhost:3000`.

### Frontend

Open `rails-with-js-project-client/index.html` in your browser — no build step needed. Make sure the Rails API server is running first.

## API Endpoints

| Method | Route | Description |
|---|---|---|
| `GET` | `/cocktail_recipes` | List all cocktails |
| `GET` | `/cocktail_recipes/:id` | Get a single cocktail with ingredients |
| `POST` | `/cocktail_recipes` | Create a new cocktail |
| `POST` | `/ingredients` | Add an ingredient to a cocktail |

## Data Models

**CocktailRecipe**
- `title` — string
- `description` — string
- `directions` — string
- `image_url` — string
- `has_many :ingredients`

**Ingredient**
- `name` — string
- `belongs_to :cocktail_recipe`

## Project Background

Built as a Rails + JavaScript project at [Flatiron School](https://flatironschool.com/) to practice building a RESTful JSON API with Rails and consuming it with object-oriented vanilla JavaScript on the frontend.
