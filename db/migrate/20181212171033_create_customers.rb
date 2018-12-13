class CreateCustomers < ActiveRecord::Migration[5.1]
  def change
    create_table :customers do |t|
      t.string :email
      t.string :subscribed_at
      t.string :billing_type
      t.references :product
      t.references :location
      t.timestamps
    end
  end
end
