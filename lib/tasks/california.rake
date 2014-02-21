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

  desc "Import from dump"
  task :import_from_dump => :environment do

    CSV.foreach("#{Rails.root}/spec/helpers/assets/california_production.csv", {:headers => true, :header_converters => :symbol}) { |row|
      r = row.to_hash
      r.delete(:id)
      r.delete(:created_at)
      r.delete(:updated_at)
      CaliforniaProduction.create(r)
    }

  end
end