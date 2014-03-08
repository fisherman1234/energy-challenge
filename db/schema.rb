# encoding: UTF-8
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
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20140308045748) do

  create_table "california_productions", :force => true do |t|
    t.datetime "time"
    t.integer  "geothermal"
    t.integer  "biomass"
    t.integer  "biogas"
    t.integer  "small_hydro"
    t.integer  "wind_total"
    t.integer  "solar"
    t.integer  "renewables"
    t.integer  "nuclear"
    t.integer  "thermal"
    t.integer  "imports"
    t.integer  "hydro"
    t.datetime "created_at",           :null => false
    t.datetime "updated_at",           :null => false
    t.decimal  "renewable_percentage"
    t.integer  "year"
    t.integer  "month"
    t.integer  "day"
    t.integer  "hour"
    t.integer  "day_of_week"
  end

  create_table "green_button_consumptions", :force => true do |t|
    t.string   "user_id"
    t.datetime "time"
    t.decimal  "usage"
    t.datetime "created_at",                         :null => false
    t.datetime "updated_at",                         :null => false
    t.integer  "year"
    t.integer  "month"
    t.integer  "day"
    t.integer  "hour"
    t.decimal  "cached_state_renewable_consumption"
    t.integer  "day_of_week"
  end

  create_table "histo_green_stat", :force => true do |t|
    t.integer "month"
    t.string  "weekday", :limit => 20
    t.integer "hour"
    t.decimal "green",                 :precision => 10, :scale => 3
  end

# Could not dump table "users" because of following StandardError
#   Unknown type 'json' for column 'goals'

end
