EnergyChallenge::Application.routes.draw do
  resources :california_production
  resources :green_button

  root :to => "home#index"
end
