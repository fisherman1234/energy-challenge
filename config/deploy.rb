set :application, "energy-challenge"
set :scm, :git
set :repository,  "git@github.com:fisherman1234/energy-challenge.git"
set :user, "ubuntu"
server "54.213.28.139", :app, :web, :db, :primary => true
set :deploy_to, "/var/www/energy-challenge"
default_run_options[:pty] = true
ssh_options[:forward_agent] = true
ssh_options[:auth_methods] = ["publickey"]
ssh_options[:keys] = ["config/HealthloopMac.pem"]