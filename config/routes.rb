Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "home#index"

  # API controller routing config
  namespace :api do
  	get :subscriptions
  end

end
