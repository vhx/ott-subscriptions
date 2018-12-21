class API::V1::CustomerController < ApplicationController

  def index
    @customers = Customer.joins(:location, :product)
                .select("customers.*,
                        locations.city as city, 
                        locations.state as state, 
                        locations.country as country, 
                        products.product_name as product_name, 
                        products.platform as platform")
                .paginate(:page => params[:page])

    # json_string = CustomerSerializer.new(@customers).serialized_json

    render json:{ 
                  payload: @customers, 
                  page: @customers.current_page, 
                  pages: @customers.total_pages
                }, 
           status: :ok
  end

  def search
    # EXTRA CREDIT: Implement searching for email, product, and subscription type
  end
  
end