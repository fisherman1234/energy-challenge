class GreenButtonController < ApplicationController
  def index
    data = GreenButtonConsumption.where('extract(year from time) = 2011 and extract(month from time) in (4)').order('time').map { |l| {:date => l.time, :consumption => l.usage, :fraction => l.cached_state_renewable_consumption} }

    respond_to do |format|
      format.json { render :json => data }
    end
  end
end
