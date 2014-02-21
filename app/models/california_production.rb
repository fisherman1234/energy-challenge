require 'csv'
require 'open-uri'
class CaliforniaProduction < ActiveRecord::Base
  attr_accessible :biogas, :biomass, :geothermal, :hydro, :imports, :nuclear, :renewables, :small_hydro, :solar, :thermal, :time, :wind_total

  def self.get_data(date)
    formatted_date = date.strftime("%Y%m%d")
    open("http://content.caiso.com/green/renewrpt/#{formatted_date}_DailyRenewablesWatch.txt") { |f| f.read }
  end

  def self.to_csv
    CSV.generate do |csv|
      csv << column_names
      all.each do |prod|
        csv << prod.attributes.values_at(*column_names)
      end
    end
  end

  def self.import_date(date)
    self.import(self.get_data(date))
  end

  def self.import(data)
    data = self.reformat(data)
    data.each do |k,v|
      attr = v.clone
      attr[:time] = k
      CaliforniaProduction.create(attr)
    end
  end

  def self.reformat(data)
    parsed_file = CSV.parse(data, {:col_sep => "\t"}).to_a
    result = {}
    date = parsed_file[0][0]


    parsed_file[2..25].each do |line|
      map = {3 => 'geothermal', 5 => 'biomass', 7 => 'biogas', 9 => 'small_hydro', 11 => 'wind_total', 13 => 'solar'}

      datetime_string = "#{date} #{line[1].to_i - 1} PST"
      date_time = DateTime.strptime(datetime_string, '%m/%d/%y %H %Z').utc
      result[date_time] ||= {}

      line.each_with_index do |line_item, index|
        next unless map[index]
        key = map[index]
        result[date_time][key] = line_item.to_i
      end
    end

    parsed_file[30..53].each do |line|
      map = {3 => 'renewables', 5 => 'nuclear', 7 => 'thermal', 9 => 'imports', 11 => 'hydro'}

      datetime_string = "#{date} #{line[1].to_i - 1} PST"
      date_time = DateTime.strptime(datetime_string, '%m/%d/%y %H %Z').utc
      result[date_time] ||= {}

      line.each_with_index do |line_item, index|
        next unless map[index]
        key = map[index]
        result[date_time][key] = line_item.to_i
      end
    end

    result
  end
end
