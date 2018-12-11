class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :email
      t.string :productName
      t.references :location
      t.string :subscribed_at
      t.string :billing_type

      t.timestamps null: false
    end
  end
end
