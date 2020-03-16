class CocktailRecipesController < ApplicationController
  before_action :set_cocktail_recipe, only: [:show, :update, :destroy]

  # GET /cocktail_recipes
  def index
    @cocktail_recipes = CocktailRecipe.all

    render json: @cocktail_recipes
  end

  # GET /cocktail_recipes/1
  def show 
    options = {}
    options[:include] = [:ingredients, :'ingredients.name']
    render json: CocktailRecipeSerializer.new(@cocktail_recipe, options).serialized_json
  end

  # POST /cocktail_recipes
  def create
    @cocktail_recipe = CocktailRecipe.new(cocktail_recipe_params)

    if @cocktail_recipe.save
      render json: @cocktail_recipe, status: :created, location: @cocktail_recipe
    else
      render json: @cocktail_recipe.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /cocktail_recipes/1
  def update
    if @cocktail_recipe.update(cocktail_recipe_params)
      render json: @cocktail_recipe
    else
      render json: @cocktail_recipe.errors, status: :unprocessable_entity
    end
  end

  # DELETE /cocktail_recipes/1
  def destroy
    @cocktail_recipe.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_cocktail_recipe
      @cocktail_recipe = CocktailRecipe.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def cocktail_recipe_params
      params.require(:cocktail_recipe).permit(:title, :description, :directions, :image_url)
    end
end
