class CreateCaliforniaProductions < ActiveRecord::Migration
  def change
    create_table :california_productions do |t|
      t.datetime :time
      t.integer :geothermal
      t.integer :biomass
      t.integer :biogas
      t.integer :small_hydro
      t.integer :wind_total
      t.integer :solar
      t.integer :renewables
      t.integer :nuclear
      t.integer :thermal
      t.integer :imports
      t.integer :hydro

      t.timestamps
    end
  end
end
