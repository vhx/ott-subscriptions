class SubscriptionsController < ApplicationController

  def index
    @subscriptions = Subscription.all
    render json: @subscriptions
  end

end
