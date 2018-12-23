class Customer < ApplicationRecord
    belongs_to :location
    belongs_to :product

    self.per_page = 10

    def self.search (params)
       
        if params[:search].present?
            customers = Customer.joins(:location, :product)
                        .select("customers.*,
                                locations.city as city, 
                                locations.state as state, 
                                locations.country as country, 
                                products.product_name as product_name, 
                                products.platform as platform")
                        .where("email LIKE ? or product_name LIKE ? or billing_type LIKE ?",
                                "%#{params[:search]}%","%#{params[:search]}%","%#{params[:search]}%")
        
            return customers
        
        end
    end
end
