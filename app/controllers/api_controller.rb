class ApiController < ApplicationController

  before_action do
  	@MAX_PAGE_RESULTS = 50
  	WillPaginate.per_page = @MAX_PAGE_RESULTS
  end


  # GET endpoint, returns subscriptions by query. 
  def subscriptions
  	# Data from GET request
    query = params["query"]
    page = params["page"].to_i

    if page < 1 || !page
      page = 1
    end

    return search_subscriptions(query, page)
  end


  # Returns subscriptions by query and page number.
  def search_subscriptions(query, page)
    # EXTRA CREDIT: Implement searching for email, product, and subscription type
    if !query
      @subscriptions = Subscription.page(page)
    else
      customer_ids = Customer.where("lower(email) LIKE ?", "%#{query.downcase}%").map {|c| c.id} # Locate customers
      product_ids = Product.where("lower(name) LIKE ?", "%#{query.downcase}%").map {|prdct| prdct.id} # Locate products
      # Find subscriptions by email, product, or subscription type #
      @subscriptions = Subscription.where(customer_id: customer_ids)
    							.or(Subscription.where(product_id: product_ids))
    							.or(Subscription.where("lower(billing_type) LIKE ?", "%#{query.downcase}%"))
    							.page(page)
    end

    res = {
      page: page,
      total_pages: @subscriptions.total_pages,
      total_results: @subscriptions.count,
      subscriptions: @subscriptions.order(subscribed_at: :desc).map {|s| {
      	customer_email: Customer.where(id: s.customer_id).first.email,
      	product_name: Product.where(id: s.product_id).first.name,
      	billing_type: s.billing_type,
      	subscribed_at: s.subscribed_at
      }}
    }
    render :json => res
  end


end
