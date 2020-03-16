class CocktailRecipeSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :description, :directions, :image_url 
  has_many :ingredients
end
