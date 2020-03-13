class CreateCocktailRecipes < ActiveRecord::Migration[6.0]
  def change
    create_table :cocktail_recipes do |t|
      t.string :title
      t.text :description
      t.text :directions
      t.string :image_url

      t.timestamps
    end
  end
end
