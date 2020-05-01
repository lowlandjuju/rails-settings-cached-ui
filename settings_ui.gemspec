$:.push File.expand_path("lib", __dir__)

# Maintain your gem's version:
require "settings_ui/version"

# Ensure JS dependencies installed
Gem.pre_install do |installer|
  if installer.spec.name == 'settings_ui'
    system("yarn install --non-interactive")
  end
end

# Describe your gem and declare its dependencies:
Gem::Specification.new do |spec|
  spec.name        = "settings_ui"
  spec.version     = SettingsUi::VERSION
  spec.authors     = ["Everin Scott"]
  spec.email       = ["mp@fixedabode.cc"]
  spec.summary     = "A settings management plugin for rails-settings-cached"
  spec.description = "A settings management plugin for rails-settings-cached"
  spec.license     = "MIT"

  # Prevent pushing this gem to RubyGems.org. To allow pushes either set the 'allowed_push_host'
  # to allow pushing to a single host or delete this section to allow pushing to any host.
  if spec.respond_to?(:metadata)
    spec.metadata["allowed_push_host"] = "http://mygemserver.com"
  else
    raise "RubyGems 2.0 or newer is required to protect against " \
      "public gem pushes."
  end

  spec.files = Dir["{app,config,test,lib,bin}/**/*", "MIT-LICENSE", "Rakefile", "README.md", ".browserslistrc", "babel.config.js", "Gemfile*", "package.json", "postcss.config.js", "yarn.lock"]

  spec.add_dependency "rails", "~> 5.2.4", ">= 5.2.4.1"
  spec.add_dependency "webpacker", "~> 5"
  spec.add_dependency "rudash", "~> 4.1"

  spec.add_development_dependency "sqlite3"

  spec.executables << 'webpack-dev-server'
  spec.executables << 'webpack'
end
