require ‘rails_helper’
require ‘rspec_api_documentation/dsl’


resource ‘Subscriptions’ do
  get "/subscriptions" do
    example "Listing subscriptions" do
      do_request

      status.should == 200
    end
  end
end
