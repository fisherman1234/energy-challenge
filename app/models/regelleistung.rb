require 'csv'
require 'open-uri'
class Regelleistung
  def self.get_links
    doc = Nokogiri::HTML(open("#{Rails.root}/lib/assets/regelleistung.net.html"))
    links = doc.css("#ausschreibung a").map { |l| l.attributes["href"].value }
    return links.select { |l| l.match("details") }
  end

  def self.get_page(page)
    puts page
    doc = Nokogiri::HTML(open(page))
    result = []
    metadata = doc.css(".main form .value").map { |l| l.content.gsub("\n", "").strip }
    metadata.unshift(page)
    rows = doc.css(".layout tbody tr")
    rows.each do |row|
      result.push(metadata + row.css("td").map { |l| l.content })
    end
    result
  end

  def self.fetch_all
    links = self.get_links
    data = [["Page", "From", "To", "Product type", "Tendertype", "Tendernumber", "Offering time", "Allocation time", "Product", "Total requirement", "Demand from anywhere", "Demand from grid 50Hz", "Demand from grid Amprion", "Demand from grid TenneT", "Demand from grid TransnetBW"]]
    links.each do |link|
      begin
        data += self.get_page(link)
      rescue
        puts "error with link #{link}"
      end
    end
    CSV.open("#{Rails.root}/lib/assets/regelleistung_out.csv", "w") do |csv|
      data.each do |row|
        csv << row
      end
    end
    nil
  end
end