class HomeController < ApplicationController
  around_filter :set_time_zone

  def show
      user_id = params["id"].to_s
      @user = User.find_by_username(user_id)

      output = GreenButtonConsumption.get_home(user_id)
      output[:forecast] = HistoGreenStat.get_forecast
      output[:user] = @user
      output[:monthly_target] = @user.goals if @user.goals
      respond_to do |format|
        format.json { render :json => output }
      end


  end

  def update
    user = User.find_by_username(params[:id])
    user.goals = params[:monthly_target]
    user.save!
    respond_to do |format|
      format.json { render :json => params }
    end
  end
end
