class GreenButtonController < ApplicationController
  def index
    last_day = params[:last_day] || Time.now.strftime('%j').to_i
    duration = params[:duration] || 6 || 31
    first_day = last_day - duration;
    if first_day <= 0
      r1 = (1..last_day).to_a
      r2 = ((366 + first_day)..366).to_a
      data1 = GreenButtonConsumption.where("extract(year from time) = 2011 and extract(doy from time) in (?)", r1).order('extract(doy from time) desc, extract(hour from time) asc')
      data2 = GreenButtonConsumption.where("extract(year from time) = 2011 and extract(doy from time) in (?)", r2).order('extract(doy from time) desc, extract(hour from time) asc')
      range = r1.to_a + r2.to_a
      data = data1 + data2
    else
      range = (first_day..last_day).to_a
      data = GreenButtonConsumption.where("extract(year from time) = 2011 and extract(doy from time) in (?)", range).order('extract(doy from time) desc, extract(hour from time) asc')
    end


    all_data = GreenButtonConsumption.where("extract(year from time) = 2011 and extract(doy from time) in (?)", range)
    min_usage = all_data.minimum('usage')
    max_usage = all_data.maximum('usage')
    step_usage = (max_usage - min_usage) / 3
    min_prod = all_data.minimum('cached_state_renewable_consumption')
    max_prod = all_data.maximum('cached_state_renewable_consumption')
    step_prod = (max_prod - min_prod) / 3

    final = data.map do |l|

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

    respond_to do |format|
      format.json { render :json => final }
    end
  end
end
