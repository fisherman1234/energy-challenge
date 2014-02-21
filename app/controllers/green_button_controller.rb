class GreenButtonController < ApplicationController
  def index
    respond_to do |format|
      format.csv { send_data GreenButtonConsumption.to_csv }
    end
  end
end
