require 'rvm/capistrano'
require 'erb'
require 'bundler/capistrano'
set :bundle_flags, '--deployment'

set :keep_releases, 6
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
set :deploy_via, :remote_cache
set :use_sudo, false


symlink_configuration = [
    %w(config/database.yml    config/database.yml),
    %w(system                 public/system)
]

namespace :deploy do
  desc "Creates symbolic links from shared folder"
  task :setup_symlinks do
    puts "\n\n=== Setting up Symbolic Links! ===\n\n"
    symlink_configuration.each do |config|
      run "ln -nfs #{File.join(shared_path, config[0])} #{File.join(release_path, config[1])}"
    end
  end
end

after "deploy:update_code", "deploy:setup_symlinks"
