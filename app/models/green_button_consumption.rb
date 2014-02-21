class GreenButtonConsumption < ActiveRecord::Base
  attr_accessible :time, :usage, :user_id


  def self.importDocForUser(string, user_id)
    points = GreenButton::GreenButtonData.new(string).to_quarter_slices
    points.each do |k,v|
      GreenButtonConsumption.create({:user_id => user_id, :time => k, :usage => v})
    end
  end
end
