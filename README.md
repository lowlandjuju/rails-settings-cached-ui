# SettingsUI
This gem is a work in progress, but aims to be a generic UI for modifying settings for Rails applications on the fly, using rails-settings-cached.

## Installation
Add this line to your application's Gemfile:

```ruby
gem 'settings_ui', git: 'https://github.com/lowlandjuju/settings_ui'
```

And then execute:
```bash
$ bundle
```

Create the engine initializer:
```bash
$ rails g settings_ui:install
```
After the installation is done, edit the created `config/initializers/settings_ui.rb` initializer file and modify `MODEL_NAME` and `SCHEMA`.

Add the following to your `config/routes.rb` file:

```ruby
mount SettingsUi::Engine, at: '/settings_ui', constraints: lambda { |request|
  CONSTRAINT_METHOD?(request)
}
```
Or whatever route you want to mount the UI at. Where `CONSTRAINT_METHOD` is whatever you want to use to restrict access to the settings UI.

## Development

And this to your `Procfile.dev` (or whatever you use for running processes in development):

```yaml
settings_ui_webpack_dev_server: bundle exec webpack-dev-server
```

## Contributing
TODO: Contribution directions go here.

## License
The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
