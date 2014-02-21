require 'spec_helper'

describe CaliforniaProduction do
  it "should reformat a dated file" do
    data = File.read("#{Rails.root}/spec/helpers/assets/20100420_DailyRenewablesWatch.txt")
    data = CaliforniaProduction.reformat(data)

    key1 = DateTime.strptime('04/20/10 16 PST', '%m/%d/%y %H %Z').utc
    data[key1]["geothermal"].should == 1071

    key1 = DateTime.strptime('04/20/10 17 PST', '%m/%d/%y %H %Z').utc
    data[key1]["imports"].should == 5437
  end

  it "should be able to import data" do
    data = File.read("#{Rails.root}/spec/helpers/assets/20100420_DailyRenewablesWatch.txt")
    CaliforniaProduction.import(data)
    CaliforniaProduction.last.biomass.should == 284
  end

  it "should be able to get data from url" do
    date = DateTime.strptime('04/20/10', '%m/%d/%y').to_date
    local_data = File.read("#{Rails.root}/spec/helpers/assets/20100420_DailyRenewablesWatch.txt")
    CaliforniaProduction.get_data(date).should == local_data
  end

  it "should import data from url" do
    date = DateTime.strptime('04/20/10', '%m/%d/%y').to_date

    CaliforniaProduction.import_date(date)
    CaliforniaProduction.count.should == 24
  end
end
