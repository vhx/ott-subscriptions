class ApiController < ApplicationController

  def subscriptions
    @subscriptions = Subscription.all
    render json: @subscriptions
  end

  def search
    # EXTRA CREDIT: Implement searching for email, product, and subscription type
  end
end
