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
    self.cache_state_renewable_consumption
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

  def self.equalize_data(consumptions)
    min_usage = consumptions.minimum('usage')
    max_usage = consumptions.maximum('usage')
    step_usage = (max_usage - min_usage) / 3
    min_prod = consumptions.minimum('cached_state_renewable_consumption')
    max_prod = consumptions.maximum('cached_state_renewable_consumption')
    step_prod = (max_prod - min_prod) / 3
    return consumptions.map do |l|

      result = {}
      result["date"] = l.time.to_date
      result["hour"] = l.time.hour

      if l.usage < min_usage + step_usage
        result["consumption"] = 1
      elsif l.usage < min_usage + 2 * step_usage
        result["consumption"] = 2
      else
        result["consumption"] = 3
      end

      if !l.cached_state_renewable_consumption
        result["fraction"] = 2
      else
        if l.cached_state_renewable_consumption < min_prod + step_prod
          result["fraction"] = 1
        elsif l.cached_state_renewable_consumption < min_prod + 2 * step_prod
          result["fraction"] = 2
        else
          result["fraction"] = 3
        end
      end

      result
    end
  end


  def self.get_monthly_scores(options)
    month = options[:month]
    day = options[:day] || 32
    user_id = options[:user_id]
    consumptions = GreenButtonConsumption.where("month = ? and user_id = ? and cached_state_renewable_consumption is not null", month, user_id)

    final = self.equalize_data(consumptions)
    stars = 0
    flags = 0

    final.each do |con|
      if con['date'].day > day
        next
      end
      if (con["fraction"] == 3 || con["fraction"] == 2) && con["consumption"] == 3
        stars += 1
      end
      if con["fraction"] == 1 && con["consumption"] == 3
        flags -= 1
      end
    end

    {:stars => stars, :flags => flags}
  end

  def self.current_month_target(user_id)
    cur_date = Time.now.in_time_zone
    return self.get_monthly_scores({:user_id => user_id, :month => cur_date.month})
  end

  def self.get_last_11_months(user_id)
    cur_date = Time.now.in_time_zone.change({:day => 15})
    result = []
    11.times do |i|
      cur_date = cur_date - 1.month
      scores = self.get_monthly_scores({:user_id => user_id, :month => cur_date.month})

      result.push({:month => cur_date.strftime('%b'), :stars => scores[:stars], :flags => scores [:flags]})
    end
    result
  end

  def self.get_real_time(user_id)
    cur_date = Time.now.in_time_zone
    doy = cur_date.strftime('%j').to_i
    hour = cur_date.hour
    current_consumption = GreenButtonConsumption.where("extract(doy from time) = ? and hour = ? and user_id = ?", doy, hour, user_id).first
    consumptions = GreenButtonConsumption.where("month = ? and user_id = ?", cur_date.month, user_id)

    min = consumptions.minimum('usage')
    max = consumptions.maximum('usage')
    step = (max - min) / 3


    if current_consumption.usage.to_f < min + step
      result = 1
    elsif current_consumption.usage.to_f < min + 2 * step
      result = 2
    else
      result = 3
    end
    return {:current => result}
  end

  def self.get_scores(user_id)
    cur_date = Time.now.in_time_zone
    scores = self.get_monthly_scores({:user_id => user_id, :month => cur_date.month, :day => cur_date.day})

    result = [{:month => cur_date.strftime('%b'), :stars => scores[:stars], :flags => scores [:flags]}]
    result += self.get_last_11_months(user_id)
    result
  end

  def self.get_home(user_id)

    home_data = Rails.cache.fetch("get_home_#{user_id}") do
      output = {}
      output[:real_time_prod] = CaliforniaProduction.get_real_time
      output[:scores] = GreenButtonConsumption.get_scores(user_id)
      output[:real_time_consumption] = GreenButtonConsumption.get_real_time(user_id)
      output[:monthly_target] = GreenButtonConsumption.current_month_target(user_id)
      output
    end
    home_data
  end

  def self.get_current_history(user_id)
    month = Time.now.in_time_zone.strftime('%m').to_i

    history = Rails.cache.fetch("get_current_history_#{user_id}_#{month}") do
      consumptions = GreenButtonConsumption.where("month = ? and user_id = ? and cached_state_renewable_consumption is not null", month, user_id).order('extract(doy from time) desc, extract(hour from time) asc')

      final = GreenButtonConsumption.equalize_data(consumptions)

      final
    end
    history
  end

  def self.reset_data
    Rails.cache.clear
    self.get_home('alan') # build for alan
    self.get_current_history('alan') # build for alan
  end
end
