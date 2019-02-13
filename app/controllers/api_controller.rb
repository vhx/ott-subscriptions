class ApiController < ApplicationController

  def subscriptions
    @subscriptions = Subscription.all.order(subscribed_at: :desc).page(params[:page])
    render json: @subscriptions, meta: pagination_dict(@subscriptions)
  end

  def search
    emails = Subscription.all.select {|subscription| subscription.customer.email.downcase.include? (params[:searchterm]).downcase}
    products = Subscription.all.select {|subscription| subscription.product.name.downcase.include? (params[:searchterm]).downcase}
    results = emails + products
    results = results.uniq
    results =  Kaminari.paginate_array(results).page(params[:page])
    render json: results, meta: pagination_dict(results)
  end

  private

  def pagination_dict(collection)
    {
      current_page: collection.current_page,
      next_page: collection.next_page,
      prev_page: collection.prev_page,
      total_pages: collection.total_pages,
      total_count: collection.total_count
    }
  end


end
