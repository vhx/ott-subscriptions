class ApiController < ApplicationController

  def subscriptions
    @subscriptions = Subscription.all.order(subscribed_at: :desc).page(params[:page])
    render json: @subscriptions, meta: pagination_dict(@subscriptions)
  end

  def search
    # EXTRA CREDIT: Implement searching for email, product, and subscription type
  end

  private

  def pagination_dict(collection)
    {
      current_page: collection.current_page,
      next_page: collection.next_page,
      prev_page: collection.prev_page, # use collection.previous_page when using will_paginate
      total_pages: collection.total_pages,
      total_count: collection.total_count
    }
  end


end
