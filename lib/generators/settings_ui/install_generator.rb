module SettingsUi
  class InstallGenerator < Rails::Generators::Base
    source_root File.expand_path("../../templates", __FILE__)
    desc "Configure necessary files to use SettingsUi"
    def copy_initializer_file
      copy_file "initializer.rb",
                Rails.root.join("config/initializers/settings_ui.rb")
    end
  end
end
