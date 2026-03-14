class CocktailRecipe < ApplicationRecord 
    has_many :ingredients, dependent: :destroy
    validates :title, presence: true
    validates :directions, presence: true
end
