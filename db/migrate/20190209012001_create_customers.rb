class CreateCustomers < ActiveRecord::Migration[5.1]
  def change
    create_table :customers do |t|
      t.string :email
      t.string :city
      t.string :state
      t.string :country

      t.timestamps
    end
  end
end
