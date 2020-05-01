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


  end
end
