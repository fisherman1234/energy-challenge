namespace :green_button do
  desc "Import data from the greenbutton example file"
  task :import_example => :environment do
    data = File.read("#{Rails.root}/spec/helpers/assets/Mountain_Single_family_Jan_1_2011_to_Jan_1_2012_RetailCustomer_1.xml")
    GreenButtonConsumption.importDocForUser(data, "Mountain_Single_family_Jan_1_2011_to_Jan_1_2012_RetailCustomer_1")
  end
end