require "settings_ui/engine"
require "rudash"

module SettingsUi
  ROOT_PATH = Pathname.new(File.join(__dir__, ".."))
  Hash.use_dot_syntax = true

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

  def self.load_defaults
    klass = Object.const_get(SettingsUi::MODEL_NAME)

    # Reload section by section
    SettingsUi::SCHEMA.keys.each do |key|
      section_id = klass.where(var: key)[0].try(:id)
      klass.delete(section_id) unless section_id.nil?
      klass.clear_cache
      klass.send("#{key}=", klass.send(key))
    end
  end

  def self.load_default_setting(section, setting)
    klass = Object.const_get(SettingsUi::MODEL_NAME)

    # Remove setting from section hash
    current_section = klass.send(section).dup
    raise StandardError.new "Setting does not exist within section" unless current_section.has_key?(setting)
    current_section.delete(setting)

    # Delete section from settings database table
    section_id = klass.where(var: section)[0].try(:id)
    return if section_id.nil?
    klass.delete(section_id)

    # Add default setting back into hash of current settings section
    klass.clear_cache
    current_section[setting] = klass.send(section)[setting]
    klass.send("#{section}=", current_section)
  end
  ################################
end
