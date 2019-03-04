# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


seed_file_name = "sample_data.json"
seed_file = File.join(Rails.root, seed_file_name)
file_data = JSON.parse(File.read(seed_file))

file_data["RECORDS"].each do |r|
  
  # Customer data
  email = r["email"]
  city = r["city"]
  state = r["state"]
  country = r["country"]

  # Product data
  prdct_name = r["product_name"]
  platform = r["platform"]

  # Subscription data
  billing_type = r["billing_type"]
  subscribed_at = r["subscribed_at"]


  # Store data #
  customer = Customer.find_by_email(email) # Check if one exits already. (Customer email is a unique index)
  product = Product.find_by_name(prdct_name) # Check if one exists already. (Product name is a unique index)

  if !customer
    customer = Customer.create(email: email, city: city, state: state, country: country)
  end

  if !product
  	product = Product.create(name: prdct_name, platform: platform)
  end

  sub_query = "customer_id = :c_id AND product_id = :p_id" 
  sub_query_data = { c_id: customer.id, p_id: product.id }
  subscription = Subscription.where([sub_query, sub_query_data]).first # Check if one exists. (Subscription (customer_id, product_id) is a unique index)

  if !subscription
  	Subscription.create(
  	  customer_id: customer.id,
  	  product_id: product.id,
  	  billing_type: billing_type,
  	  subscribed_at: subscribed_at
  	)
  end
end