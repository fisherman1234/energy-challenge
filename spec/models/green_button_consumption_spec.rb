require 'spec_helper'

describe GreenButtonConsumption do
  it "should import an xml file" do
    data = File.read("#{Rails.root}/spec/helpers/assets/Mountain_Single_family_Jan_1_2011_to_Jan_1_2012_RetailCustomer_1.xml")

    GreenButtonConsumption.importDocForUser(data, 1)
    GreenButtonConsumption.first.user_id.should == "1"
    GreenButtonConsumption.first.time.to_s.should == "2011-01-01 01:00:00 UTC"
  end
end
