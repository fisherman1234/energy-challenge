class User < ActiveRecord::Base
  attr_accessible :email, :goals, :username
  serialize :goals, JSON
end
