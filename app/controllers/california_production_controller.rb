class CaliforniaProductionController < ApplicationController
  def index
    respond_to do |format|
      format.csv { send_data CaliforniaProduction.to_csv }
    end
  end
end
