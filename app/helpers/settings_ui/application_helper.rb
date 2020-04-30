require "webpacker/helper"

module SettingsUi
  module ApplicationHelper
    include ::Webpacker::Helper

    def current_webpacker_instance
      SettingsUi.webpacker
    end
  end
end
