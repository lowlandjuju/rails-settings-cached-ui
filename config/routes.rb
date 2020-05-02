SettingsUi::Engine.routes.draw do
  root to: "settings#index"
  scope :settings do
    put '/', to: 'settings#update'
  end
end
