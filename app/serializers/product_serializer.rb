class ProductSerializer
  include FastJsonapi::ObjectSerializer
  attributes :product_name, :platform
  has_one :customer
end
