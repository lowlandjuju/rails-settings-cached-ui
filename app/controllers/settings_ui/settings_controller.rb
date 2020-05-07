require_dependency "settings_ui/application_controller"

module SettingsUi
  class SettingsController < ApplicationController
    def index
      @settings = SettingsUi.get_all
      @schema = SettingsUi::SCHEMA
      @application = {
        name: Rails.application.class.parent.name
      }
    end

    def update(default: false)
      ## Update a single setting value, optionally return to default value
      ## Check if value matches schema
      update = setting_params.to_h.symbolize_keys
      begin
        SettingsUi.set(update)
        render json: {
            message: 'success'
        }, status: 200
      rescue StandardError => e
        render json: {
            error: e.inspect
        }, status: 500
      end
    end

    def default
      # Return settings to defaults. Either single setting, or all settings.
      begin
        if setting_params[:scope] == 'all'
          SettingsUi.load_defaults
        elsif setting_params[:scope] == 'single'
          SettingsUi.load_default_setting(setting_params[:section], setting_params[:path])
        end
        render json: {
            message: 'success'
        }, status: 200
      rescue StandardError => e
        render json: {
            error: e.inspect
        }, status: 500
      end
    end

    private

    def setting_params
      params.require(:setting).permit(:section, :path, :value, :scope)
    end
  end
end
