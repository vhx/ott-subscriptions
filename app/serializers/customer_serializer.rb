class CustomerSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :email, :subscribed_at, :billing_type, :city, :state, :country, :product_name, :platform
  belongs_to :location
  belongs_to :product
end