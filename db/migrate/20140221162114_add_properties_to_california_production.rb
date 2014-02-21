class AddPropertiesToCaliforniaProduction < ActiveRecord::Migration
  def change
    add_column :california_productions, :renewable_percentage, :decimal
    add_column :california_productions, :year, :integer
    add_column :california_productions, :month, :integer
    add_column :california_productions, :day, :integer
    add_column :california_productions, :hour, :integer
  end
end
