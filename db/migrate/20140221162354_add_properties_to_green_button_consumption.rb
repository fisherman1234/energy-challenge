class AddPropertiesToGreenButtonConsumption < ActiveRecord::Migration
  def change
    add_column :green_button_consumptions, :year, :integer
    add_column :green_button_consumptions, :month, :integer
    add_column :green_button_consumptions, :day, :integer
    add_column :green_button_consumptions, :hour, :integer
  end
end
