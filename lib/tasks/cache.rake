namespace :cache do
  desc "Reset"
  task :reset => :environment do
    GreenButtonConsumption.reset_data
  end
end