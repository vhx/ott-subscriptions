class LocationSerializer
  include FastJsonapi::ObjectSerializer
  attributes :city, :state, :country
  has_many :customer
end
