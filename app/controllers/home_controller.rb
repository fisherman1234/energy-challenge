class HomeController < ApplicationController
  around_filter :set_time_zone

  def show
      user_id = params["id"].to_s
      output = GreenButtonConsumption.get_home(user_id)
      output[:forecast] = HistoGreenStat.get_forecast

      respond_to do |format|
        format.json { render :json => output }
      end


    end
end
