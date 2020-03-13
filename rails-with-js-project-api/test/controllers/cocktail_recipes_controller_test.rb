require 'test_helper'

class CocktailRecipesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @cocktail_recipe = cocktail_recipes(:one)
  end

  test "should get index" do
    get cocktail_recipes_url, as: :json
    assert_response :success
  end

  test "should create cocktail_recipe" do
    assert_difference('CocktailRecipe.count') do
      post cocktail_recipes_url, params: { cocktail_recipe: { description: @cocktail_recipe.description, directions: @cocktail_recipe.directions, image_url: @cocktail_recipe.image_url, title: @cocktail_recipe.title } }, as: :json
    end

    assert_response 201
  end

  test "should show cocktail_recipe" do
    get cocktail_recipe_url(@cocktail_recipe), as: :json
    assert_response :success
  end

  test "should update cocktail_recipe" do
    patch cocktail_recipe_url(@cocktail_recipe), params: { cocktail_recipe: { description: @cocktail_recipe.description, directions: @cocktail_recipe.directions, image_url: @cocktail_recipe.image_url, title: @cocktail_recipe.title } }, as: :json
    assert_response 200
  end

  test "should destroy cocktail_recipe" do
    assert_difference('CocktailRecipe.count', -1) do
      delete cocktail_recipe_url(@cocktail_recipe), as: :json
    end

    assert_response 204
  end
end
