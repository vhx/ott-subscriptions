require 'rails_helper'

RSpec.describe ApiController, type: :controller do

  describe "GET /api/subscriptions" do

  	it "W/o query params" do
  	  get :subscriptions
  	  expect(response).to have_http_status(200)
  	end

  	it "W/ query parameter" do
  	  get :subscriptions, params: {query: "monthly"}
  	  res_obj = JSON.parse(response.body)
  	  expect(response).to have_http_status(200)
  	  expect(res_obj["subscriptions"].length).to be > 0
  	end

  	it "W/ valid page number" do
  	  get :subscriptions, params: {page: 2}
  	  expect(response).to have_http_status(200)
  	end

  	it "W/ invalid page number" do
  	  get :subscriptions, params: {page: 0}
  	  res_obj = JSON.parse(response.body)
  	  expect(response).to have_http_status(200)
  	  expect(res_obj["page"]).to eq(1) # Invalid pages should be changed to 1
  	end

  	it "W/ query and page params" do
  	  get :subscriptions, params: {query: "yearly", page: 2}
  	  expect(response).to have_http_status(200)
  	end

  	it "Test basic SQL injection through parameters" do
  	  get :subscriptions, params: {query: "\'\""}
  	  expect(response).to have_http_status(200)
  	end

  end

end
