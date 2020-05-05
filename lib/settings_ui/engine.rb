module SettingsUi
  class Engine < ::Rails::Engine
    isolate_namespace SettingsUi

    initializer "webpacker.proxy" do |app|
      insert_middleware = begin
                            SettingsUi.webpacker.config.dev_server.present?
                          rescue
                            nil
                          end
      next unless insert_middleware

      app.middleware.insert_before(
          0, Webpacker::DevServerProxy, # "Webpacker::DevServerProxy" if Rails version < 5
          ssl_verify_none: true,
          webpacker: SettingsUi.webpacker
      )
    end

    config.app_middleware.use(
        Rack::Static,
        urls: ["/settings-ui-packs"], root: "settings_ui/public"
    )
  end
end
