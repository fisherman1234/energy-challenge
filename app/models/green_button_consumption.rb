class GreenButtonConsumption < ActiveRecord::Base
  attr_accessible :time, :usage, :user_id


  def self.importDocForUser(string, user_id)
    points = GreenButton::GreenButtonData.new(string).to_hourly_slices
    points.each do |k,v|
      GreenButtonConsumption.create({:user_id => user_id, :time => k, :usage => v})
    end
  end

  def self.to_csv
    CSV.generate do |csv|
      csv << column_names
      all.each do |prod|
        csv << prod.attributes.values_at(*column_names)
      end
    end
  end
end
