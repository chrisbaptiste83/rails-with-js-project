class IngredientSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :cocktail_recipe_id
end
