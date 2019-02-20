Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

# Specifies what Rails should route '/' to with the root method
  root to: "home#index"

#get "__api__endpoints___"

  #retrieve subscriptions, hits the API controller, then hits the subscriptions action
  get "/localhost:3000/subscriptions", to: "api#subscriptions"


  # retrieve search results, hits the API controller, then hits the search action
  get "/localhost:3000/search", to: "api#search"
end
