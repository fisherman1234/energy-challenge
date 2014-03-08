require 'rvm/capistrano'
require 'erb'
require 'bundler/capistrano'
set :whenever_command, "bundle exec whenever"
require "whenever/capistrano"

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

  task :restart do
    run "#{sudo} service nginx restart"
  end
end

namespace :client_build do
  desc "Build the client js files"
  task :build do
    output = run_locally "cd public/javascripts; node build.js"
    puts "OUTPUT: " + output
  end
end

after "deploy:update_code", "deploy:setup_symlinks"
after "deploy:update_code", "deploy:migrate"
after "deploy:update_code", "deploy:restart"

namespace :remote do
  desc "Connects remotely to the database"
  task :console do
    server ||= find_servers_for_task(current_task).first
    exec %{ssh #{user}@#{server} -i #{ssh_options[:keys].first} -t "~/.rvm/bin/rvm-shell -c 'cd #{current_path} && bundle exec rails c #{rails_env}'"}
  end

  desc "Connects remotely to the database"
  task :dbconsole do
    server ||= find_servers_for_task(current_task).first
    exec %{ssh #{user}@#{server} -i #{ssh_options[:keys].first} -t "~/.rvm/bin/rvm-shell -c 'cd #{current_path} && bundle exec rails dbconsole #{rails_env}'"}
  end
end