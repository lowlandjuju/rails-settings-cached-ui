SettingsUi::Engine.routes.draw do
  root to: "settings#index"
  scope :settings do
    put '/', to: 'settings#update'
    post '/default', to: 'settings#default'
  end
end
