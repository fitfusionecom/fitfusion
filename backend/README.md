medusa new [root] [starter] Create a new Medusa project.
medusa db:setup Create the database, run migrations and sync links
medusa db:create Create the database used by your application
medusa db:migrate Migrate the database by executing pending migrations
medusa db:migrate:scripts Run all migration scripts
medusa db:rollback [modules...] Rollback last batch of executed migrations for a given module
medusa db:generate [modules...] Generate migrations for a given module
medusa plugin:db:generate Generate migrations for modules in a plugin
medusa db:sync-links Sync database schema with the links defined by your application and Medusa core
medusa plugin:build Build plugin source for publishing to a package registry
medusa plugin:develop Start plugin development process in watch mode. Changes will be re-published to the local packages  
 registry
medusa plugin:publish Publish the plugin to the local packages registry
medusa plugin:add [plugin_names...] Add the specified plugin to the project from the local packages registry
medusa telemetry Enable or disable collection of anonymous usage data.
medusa develop Start development server. Watches file and rebuilds when something changes
medusa start Start production server.
medusa build Build your project.
medusa user Create a user
medusa exec [file] [args..] Run a function defined in a file.
