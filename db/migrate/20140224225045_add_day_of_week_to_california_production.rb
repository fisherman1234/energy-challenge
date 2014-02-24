class AddDayOfWeekToCaliforniaProduction < ActiveRecord::Migration
  def change
    add_column :california_productions, :day_of_week, :integer
  end
end
