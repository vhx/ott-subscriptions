# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'json'

data = JSON.parse(File.read('sample_data.json'))

Location.destroy_all
Product.destroy_all
Customer.destroy_all

data.each do |records, customers|
    # puts ""
    # puts records
    # puts ""
    # puts "****************************************"
    customers.each do |customer|
        
        email = ""
        city = ""
        state = ""
        country = ""
        product_name = ""
        platform = ""
        subscribed_at = ""
        billing_type = ""

        customer.each do |key, val|
            #puts "key: #{key}  val: #{val}"

            if key == "email"
                email = val
              
            elsif key == "city"
                city = val
            
            elsif key == "state"
                state = val   
            
            elsif key == "country"
                country = val

            elsif key == "product_name"
                product_name = val

            elsif key == "platform"
                platform = val

            elsif key == "subscribed_at"
                subscribed_at = val
            
            elsif key == "billing_type"
                billing_type = val
            
            end
            
        end
        #create tables here location -> product -> customer
        location = Location.create(city: city, state: state, country: country)
        product = Product.create(product_name: product_name, platform: platform)
        cust = Customer.create(email: email, subscribed_at: subscribed_at, billing_type: billing_type, product_id: product.id, location_id: location.id)

        # puts "email: is #{email}"
        # puts "city: is #{city}"
        # puts "state: is #{state}"
        # puts "country: is #{country}"
        # puts "product_name: is #{product_name}"
        # puts "platform: is #{platform}"
        # puts "subscribed_at: is #{subscribed_at}"
        # puts "billing_type: is #{billing_type}"
        # puts "****************************************"
    end

    puts "***** finished seeding db *****"
end
