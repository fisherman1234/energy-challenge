require 'csv'
require 'open-uri'
class CaliforniaProduction < ActiveRecord::Base
  attr_accessible :biogas, :biomass, :geothermal, :hydro, :imports, :nuclear, :renewables, :small_hydro, :solar, :thermal, :time, :wind_total
  before_save :cache_properties

  def cache_properties
    if renewables && nuclear && thermal && imports && hydro
      sum = renewables + nuclear + thermal + imports + hydro
      self.renewable_percentage = (hydro.to_f + renewables.to_f) / (renewables + nuclear + thermal + imports + hydro) if sum != 0
    end
    return unless time
    self.year = time.year
    self.month = time.month
    self.day = time.day
    self.day_of_week = time.wday
    self.hour = time.hour
  end

  def self.monthly_green_fraction(year, month)
    consumptions = CaliforniaProduction.where("year = ? and month = ? and renewable_percentage is not null", year, month)
    return nil if consumptions.count == 0
    num = consumptions.map { |c| c.renewable_percentage }.sum.to_f
    den = consumptions.count
    return nil unless den && den != 0
    num / den
  end

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

  def self.get_real_time
    output = {:details => []}
    html = open("http://content.caiso.com/outlook/SP/renewables.html") { |f| f.read }
    doc = Nokogiri::HTML(html)
    totalRenewable = doc.css("#totalrenewables").first.children.text.gsub(' MW', '').to_f
    solar = doc.css("#currentsolar").first.children.text.gsub(' MW', '').to_f
    wind = doc.css("#currentwind").first.children.text.gsub(' MW', '').to_f
    raw_csv = open("http://content.caiso.com/outlook/systemstatus.csv") { |f| f.read }

    parsed_file = CSV.parse(raw_csv, {:col_sep => ","}).to_a
    total_prod = parsed_file[1][1].to_f
    percentage = totalRenewable / (total_prod + totalRenewable)


    productions = CaliforniaProduction.where("month = ?", DateTime.now.month)

    min = productions.minimum('renewable_percentage')
    max = productions.maximum('renewable_percentage')
    step = (max - min) / 3

    if percentage < min + step
      result = 1
    elsif percentage < min + 2 * step
      result = 2
    else
      result = 3
    end

    output[:details].push({:name => 'Other Renewable', :value => totalRenewable - (wind+solar)})
    output[:details].push({:name => 'Non Renewable', :value => total_prod - totalRenewable})
    output[:details].push({:name => 'Solar', :value => solar})
    output[:details].push({:name => 'Wind', :value => wind})

    output[:current] = result

    output
  end
end
