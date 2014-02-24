class AddDayOfWeekToGreenButtonConsumption < ActiveRecord::Migration
  def change
    add_column :green_button_consumptions, :day_of_week, :integer
  end
end
