class AddCachedRenToGreenButtonConsumption < ActiveRecord::Migration
  def change
    add_column :green_button_consumptions, :cached_state_renewable_consumption, :decimal
  end
end
