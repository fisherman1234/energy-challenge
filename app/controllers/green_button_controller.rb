class GreenButtonController < ApplicationController
  def index
    month = params[:month] || Time.now.in_time_zone.strftime('%m').to_i
    user_id = params["user_id"].to_s

    puts "111"
    puts month

    consumptions = GreenButtonConsumption.where("month = ? and user_id = ? and cached_state_renewable_consumption is not null", month, user_id).order('extract(doy from time) desc, extract(hour from time) asc')

    final = GreenButtonConsumption.equalize_data(consumptions)

    respond_to do |format|
      format.json { render :json => final }
    end
  end
end
