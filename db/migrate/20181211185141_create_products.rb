class CreateProducts < ActiveRecord::Migration[5.1]
  def change
    create_table :products do |t|
      t.string :productName
      t.string :platform
      t.timestamps
    end
  end
end
