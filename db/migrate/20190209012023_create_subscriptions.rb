class CreateSubscriptions < ActiveRecord::Migration[5.1]
  def change
    create_table :subscriptions do |t|
      t.string :subscribed_at
      t.string :billing_type
      t.integer :customer_id

      t.timestamps
    end
  end
end
