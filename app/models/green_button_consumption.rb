class GreenButtonConsumption < ActiveRecord::Base
  attr_accessible :time, :usage, :user_id
  before_save :cache_properties

  def cache_properties
    return unless time
    self.year = time.year
    self.month = time.month
    self.day = time.day
    self.hour = time.hour
    self.day_of_week = time.wday
    self.cached_state_renewable_consumption
  end

  def cache_state_renewable_consumption
    self.cached_state_renewable_consumption = CaliforniaProduction.find_by_year_and_month_and_day_and_hour(year, month, day, hour).try(:renewable_percentage)
  end

  def self.cache_state_green_fraction(year, month, user_id)
    consumptions = GreenButtonConsumption.where("year = ? and month = ? and user_id = ? and cached_state_renewable_consumption is null", year, month, user_id)
    consumptions.each do |c|
      c.cache_state_renewable_consumption
      c.save
    end
  end

  def self.compare_green_fractions(year, month, user_id)
    u = self.monthly_green_fraction(year, month, user_id)
    s = CaliforniaProduction.monthly_green_fraction(year, month)
    return {:user => u, :state => s, :delta => (u-s) }
  end

  def self.monthly_green_fraction(year, month, user_id)
    self.cache_state_green_fraction(year, month, user_id)

    consumptions = GreenButtonConsumption.where("year = ? and month = ? and user_id = ? and cached_state_renewable_consumption is not null", year, month, user_id)
    return nil if consumptions.count == 0
    num = consumptions.map{|c| c.cached_state_renewable_consumption * c.usage.to_f}.sum.to_f
    den = consumptions.map{|c| c.usage}.sum
    return nil unless den && den != 0
    num / den
  end

  def self.importDocForUser(string, user_id)
    points = GreenButton::GreenButtonData.new(string).to_hourly_slices
    points.each do |k,v|
      GreenButtonConsumption.create({:user_id => user_id, :time => k, :usage => v})
    end
  end

  def self.to_csv
    CSV.generate do |csv|
      csv << column_names
      all.each do |prod|
        csv << prod.attributes.values_at(*column_names)
      end
    end
  end
end
