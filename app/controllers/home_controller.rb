class HomeController < ApplicationController
  def show
    output = {}
    user_id = params["id"].to_s
    output[:real_time_prod] = CaliforniaProduction.get_real_time
    output[:scores] = GreenButtonConsumption.get_scores(user_id)
    output[:real_time_consumption] = GreenButtonConsumption.get_real_time(user_id)
    output[:monthly_target] = GreenButtonConsumption.current_month_target(user_id)
    output[:forecast] = HistoGreenStat.get_forecast

    respond_to do |format|
      format.json { render :json => output }
    end


  end
end
