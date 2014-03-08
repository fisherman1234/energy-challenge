class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email
      t.string :username
      t.timestamps
    end
    add_column :users, :goals, "json"
    User.find_or_initialize_by_username("alan").save

  end
end
