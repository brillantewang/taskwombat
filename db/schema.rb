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

ActiveRecord::Schema.define(version: 20171219003435) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "tasks", force: :cascade do |t|
    t.string "task_type"
    t.date "date"
    t.string "task_time"
    t.string "location"
    t.text "description"
    t.string "vehicle_requirements"
    t.integer "user_id"
    t.integer "tasker_id"
    t.boolean "complete", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "form_complete", default: false, null: false
    t.index ["tasker_id"], name: "index_tasks_on_tasker_id"
    t.index ["user_id"], name: "index_tasks_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.boolean "is_tasker", default: false, null: false
    t.integer "num_of_reviews"
    t.integer "num_of_completed_tasks"
    t.integer "percent_positive"
    t.string "tasker_description"
    t.integer "price_per_hour"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.integer "zip_code", null: false
    t.string "image_url", default: "https://res.cloudinary.com/dezmnl5mf/image/upload/v1512006900/dummy_profile_image_m7vtxo.png"
    t.string "available_tasker_time", default: "8:00am"
    t.string "available_task_type", default: "General Cleaning"
    t.integer "unavailable_tasker_weekday"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

end
