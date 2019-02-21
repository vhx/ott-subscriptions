class SubscriptionSerializer < ActiveModel::Serializer
  attributes :id, :subscribed_at, :billing_type, :customer_id

  belongs_to :customer
  has_one :product
  has_one :platform
end


# I think i initially was going to serialize from the perspective of the customer
# where the results would have a customer that has a subscription that has a product and platform
# I think I read that other people were struggling with this as well, going two layers deep
# I had spent a decent amount of time struggling with it so I circumvented it by formatting
# it with a subscription focus
