class Customer < ApplicationRecord
    belongs_to :location
    belongs_to :product

    self.per_page = 10
end
