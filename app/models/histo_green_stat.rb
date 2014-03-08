class HistoGreenStat < ActiveRecord::Base
  set_table_name "histo_green_stat"

  def self.get_forecast
    current_time = Time.now
    result = []
    6.times do |t|
      current_time = current_time + 1.hour
      hour = current_time.hour.to_i
      month = current_time.month.to_i
      day = current_time.strftime('%A').downcase
      data = HistoGreenStat.where("month = ? and weekday = ? and hour = ?", month, day, hour).first
      if data
        result.push({:hour => hour, :forecast => self.normalize(data.green, month)})
      end
    end
    result
  end

  def self.normalize(value, month)
    data = HistoGreenStat.where("month = ?", month)
    min = data.minimum("green")
    max = data.maximum("green")
    step = max - min
    if value < min + step
      return 1
    elsif value < min + 2 * step
      return 2
    else
      return 3
    end
  end
end