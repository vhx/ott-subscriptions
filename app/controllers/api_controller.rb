class ApiController < ApplicationController

  before_action do
  	@MAX_PAGE_RESULTS = 25
  	WillPaginate.per_page = @MAX_PAGE_RESULTS
  end

  # GET endpoint, returns subscriptions by query. 
  def subscriptions
    @subscriptions = []
  end

  # Returns subscriptions by query and page number.
  def search_subscriptions
    # EXTRA CREDIT: Implement searching for email, product, and subscription type
  end
end
