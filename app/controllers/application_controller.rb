class ApplicationController < ActionController::Base
  protect_from_forgery

  around_filter :set_time_zone

  private

  def set_time_zone
    old_time_zone = Time.zone
    Time.zone = browser_timezone if browser_timezone.present?
    puts Time.zone
    yield
  ensure
    Time.zone = old_time_zone
  end

  def browser_timezone
    cookies["browser.timezone"]
  end
end
