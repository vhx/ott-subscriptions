class ApiController < ApplicationController

  # GET endpoint, returns subscriptions by query. 
  def subscriptions
    @subscriptions = []
  end

  # Returns subscriptions by query and page number.
  def search_subscriptions
    # EXTRA CREDIT: Implement searching for email, product, and subscription type
  end
end
