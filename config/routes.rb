Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "home#index"

  #get "__api__endpoints___"
  get "/localhost:3000/subscriptions", to: "subscriptions#index"


end
