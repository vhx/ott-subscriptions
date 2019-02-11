# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

# Import json file
customers_records = ActiveSupport::JSON.decode(File.read('db/sample_data.json'))


# Iterate over data and create customer, subscription. product, and platform for each customer hash
# Establish associations with foreign keys with Model.all.last.id

customers_records.each do |cust|
  Customer.create(email: cust["email"], city: cust["city"], state: cust["state"], country: cust["country"])
  Subscription.create(subscribed_at: cust["subscribed_at"], billing_type: cust["billing_type"], customer_id: Customer.all.last.id)
  Product.create(name: cust["product_name"], subscription_id: Subscription.all.last.id)
  Platform.create(name: cust["platform"], subscription_id: Subscription.all.last.id)
end
