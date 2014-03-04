EnergyChallenge::Application.routes.draw do
  resources :california_production
  resources :green_button

  match '*path' => 'home#index'

end
