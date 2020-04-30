SettingsUi::Engine.routes.draw do
  resources :settings, only: [:index, :update]
  root to: "settings#index"
end
