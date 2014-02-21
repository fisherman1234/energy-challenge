namespace :california do
  desc "Import all the data for california"
  task :import_all => :environment do
    CaliforniaProduction.delete_all
    date = DateTime.strptime('04/20/10', '%m/%d/%y').to_date
    while  date < Date.today - 2.days
      begin
        CaliforniaProduction.import_date(date)
      rescue
      end
      date += 1.day
    end


  end
end