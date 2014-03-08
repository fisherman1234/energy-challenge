class GreenButtonController < ApplicationController
  def index
    month = params[:month] || Time.now.in_time_zone.strftime('%m').to_i
    user_id = params["user_id"].to_s

    final = GreenButtonConsumption.get_current_history(user_id)

    respond_to do |format|
      format.json { render :json => final }
    end
  end
end
