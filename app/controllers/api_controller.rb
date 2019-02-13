class ApiController < ApplicationController

  def subscriptions
    @subscriptions = Subscription.all.order(subscribed_at: :desc).page(params[:page])
    render json: @subscriptions
  end

  def search
    # EXTRA CREDIT: Implement searching for email, product, and subscription type
  end
end
