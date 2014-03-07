EnergyChallenge::Application.routes.draw do
  scope "api" do
    resources :california_production
    resources :green_button
    resources :home
  end


  match '*path' => 'home#index'
  match '/' => 'home#index'

end
