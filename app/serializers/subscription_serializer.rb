class SubscriptionSerializer < ActiveModel::Serializer
  attributes :id, :subscribed_at, :billing_type, :customer_id

  belongs_to :customer
  has_one :product
  has_one :platform
end
