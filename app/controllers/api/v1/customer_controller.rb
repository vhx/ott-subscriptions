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
                  customers: @customers, 
                  page: @customers.current_page, 
                  pages: @customers.total_pages
                }, 
           status: :ok
  end

  # EXTRA CREDIT: Implement searching for email, product, and subscription type
  def search
    if params[:search]
      @customers = Customer.search(params).paginate(:page => params[:page])
      render json:{ 
                    customers: @customers, 
                    page: @customers.current_page, 
                    pages: @customers.total_pages
                  }, 
              status: :ok
    end 
  end
  
end