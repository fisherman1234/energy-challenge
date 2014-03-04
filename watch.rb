watch('public/javascripts/components/bootstrap/less/.*\.less') do
  system 'lessc public/stylesheets/application.less > public/stylesheets/base.css'
end

watch('public/stylesheets/.*\.less') do
  system 'lessc public/stylesheets/application.less > public/stylesheets/base.css'
  puts ("app compiled (#{Time.now})")
end