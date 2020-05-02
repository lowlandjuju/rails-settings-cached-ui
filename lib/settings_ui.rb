require "settings_ui/engine"
require "rudash"

module SettingsUi
  ROOT_PATH = Pathname.new(File.join(__dir__, ".."))

  class << self
    def webpacker
      @webpacker ||= ::Webpacker::Instance.new(
          root_path: ROOT_PATH,
          config_path: ROOT_PATH.join("config/webpacker.yml")
      )
    end
  end

  # Helper classes for rails-settings-cached models with nested object schemas
  ################################
  def self.set(section:, path:, value:)
    klass = Object.const_get(SettingsUi::MODEL_NAME)
    group = klass.send(section)
    R_.set(group, path, value)
    klass.send("#{section}=", group)
  end

  def self.get_all
    klass = Object.const_get(SettingsUi::MODEL_NAME)
    settings = {}
    SettingsUi::SCHEMA.keys.each { |key| settings[key] = klass.send(key) }
    settings
  end

  def self.get_type(section, path)
    R_.get(SettingsUi::SCHEMA, "#{section}.#{path}")[:type]
  end
  ################################
end
