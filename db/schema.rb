# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 0) do

  create_table "customers", force: :cascade do |t|
    t.string "email", null: false
    t.string "city", null: false
    t.string "state", null: false
    t.string "country", null: false
    t.index ["email"], name: "index_customers_on_email", unique: true
  end

  create_table "products", force: :cascade do |t|
    t.string "name", null: false
    t.string "platform", null: false
    t.index ["name"], name: "index_products_on_name", unique: true
  end

  create_table "subscriptions", id: false, force: :cascade do |t|
    t.integer "customer_id", null: false
    t.integer "product_id", null: false
    t.string "billing_type", null: false
    t.datetime "subscribed_at", null: false
    t.index ["customer_id", "product_id"], name: "index_subscriptions_on_customer_id_and_product_id", unique: true
  end

end
