class Subscription < ApplicationRecord
  belongs_to :customer
  has_one :product
  has_one :platform
end
