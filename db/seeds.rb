# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# [
# {
# "email":"andreas@cummingsborer.io",
# "city":"West Thuhaven",
# "state":"Illinois",
# "country":"Maldives",
# "product_name":"The Cybernetic Ghost of Christmas Past from the Future Show",
# "platform":"Playstation",
# "subscribed_at":"2018-11-14 20:14:03.548287",
# "billing_type":"Yearly"
# },...
#
# ]

customers_records = ActiveSupport::JSON.decode(File.read('db/sample_data.json'))

customers_records.each do |cust|
  Customer.create(email: cust["email"], city: cust["city"], state: cust["state"], country: cust["country"])
  Subscription.create(subscribed_at: cust["subscribed_at"], billing_type: cust["billing_type"], customer_id: Customer.all.last.id)
  Product.create(name: cust["product_name"], subscription_id: Subscription.all.last.id)
  Platform.create(name: cust["platform"], subscription_id: Subscription.all.last.id)
end
