class CreateGreenButtonConsumptions < ActiveRecord::Migration
  def change
    create_table :green_button_consumptions do |t|
      t.string :user_id
      t.datetime :time
      t.decimal :usage

      t.timestamps
    end
  end
end
