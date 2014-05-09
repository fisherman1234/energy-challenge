require 'csv'
require 'open-uri'
class Regelleistung
  def self.get_links
    doc = Nokogiri::HTML(open("#{Rails.root}/lib/assets/regelleistung.net.html"))
    links = doc.css("#ausschreibung a").map { |l| l.attributes["href"].value }
    return links.select { |l| l.match("result") }
  end

  def self.get_page(page)
    puts page
    doc = Nokogiri::HTML(open(page))
    result = []
    metadata = [doc.css("div.main table.layout")[0].css("td")[1].content]
    metadata.unshift(page)
    rows = doc.css("table.main")[1].css("table.layout")[2].css("tbody tr")
    rows.each do |row|
      result.push(metadata + row.css("td").map { |l| l.content.gsub("\n", "").strip })
    end
    result
  end

  def self.fetch_all
    links = self.get_links
    data = [["Page", "Date", "Product", "Average capacity price [Euro/MW]", "Marginal capacity price [Euro/MW]"]]
    links[0..1].each do |link|
      data += self.get_page(link)

      #begin
      #rescue
      #  puts "error with link #{link}"
      #end
    end
    CSV.open("#{Rails.root}/lib/assets/regelleistung_out_result.csv", "w") do |csv|
      data.each do |row|
        csv << row
      end
    end
    nil
  end
end