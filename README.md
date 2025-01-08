# Procyon Plugin Boilerplate
## Description
A starter project to help create a new WordPress Block Plugin. I found myself doing some of the same tasks over and over. This includes an update system using [yahnis-elsts/plugin-update-checker](https://github.com/YahnisElsts/plugin-update-checker) and a GitHub action to build zip files and releases so you can update the plugin right from WordPress.

## Usage
Note that this is under development, so it probably doesn't work at all. But if you want to try it out, you can do the following:

1. Clone the repo
2. In your plugins directory, run `export GITHUB_ACCOUNT=nicolasgalvez && npx @wordpress/create-block test --template=<path-to-cloned-repo>/procyon-plugin-boilerplate --interactive`

This will scaffold a new block plugin in the `test` folder.

Note: the `GITHUB_ACCOUNT` is used for the GitHub action and plugin updater. You can't pass the update URI to @wordpress/create-block, so I made a workaround. In the future, I will add a wrapper to allow custom options.

It will generate a URL like this for the update checker: `https://github.com/<GITHUB_ACCOUNT>/<slug>/releases/tag/<version>`

If you want to set the plugin URI or repository manually, you can do so in the `plugin.json` file and the main plugin.php file:

```php
// plugin.php
$myUpdateChecker = PucFactory::buildUpdateChecker(
	'https://github.com/your-account/<slug>/', // plugin name must match the folder name
	__FILE__,
	'plugin-test'
);
```
Read more [on the plugin-update-checker page](https://github.com/YahnisElsts/plugin-update-checker?tab=readme-ov-file#github-integration).

### Adding another block to the plugin
You can add another block to the plugin using the `--no-plugin` option by navigating to the `src` folder and running:
`npx @wordpress/create-block other --template=<path-to-cloned-repo>/procyon-plugin-boilerplate --interactive --no-plugin`

The folder structure is as follows:
```
test
├── src
│   └──blockname
│      ├── block.json
│      ├── ...
│   └──blockname2
│      ├── block.json
│      ├── ...
├── plugin.json <-- needed for update checker
├── readme.txt  <-- needed for update checker
├── ...
```
### Development

I suggest you make the plugin outside your `wp-content/plugins` folder and symlink it to your `plugins` folder. This way you will not lose your development files when you update the plugin from WordPress. WordPress will delete your plugin's folder before it unzips the new one in that location. I've done that when testing the installation process. 😳

## Updating a new version

1. Ensure the readme.txt version is updated
2. Ensure the plugin.json version is updated
3. Ensure the version in the main plugin file is updated
4. Create a new tag for release either at github.com or using git tag v0.1.x -m "message"
5. Push the tag to github using `git push origin v0.1.x`

There is github action that will automatically build the zip file for release and create a new release. The zip file will be available in the release assets. Any site with the plugin installed will now be able to update the plugin.



## Features
- [x] Create a new block plugin
- [x] Allow multiple blocks per plugin
- [ ] Add wrapper to allow custom options instead of env variables
- [x] Update the Github action to build the plugin zip file
- [ ] Clean up the variants
- [ ] Linting
- [ ] Tests (BTW, if anyone knows a smooth way to test Github Actions locally, please let me know. I was using act, but it doesn't compile on my M2 Mac)

### Variants
A work in progress... the default block is based on the interactive block example from the Gutenberg Repository. I plan to move that to the interactive variant so the default block can be basic.
* default
* interactive
* typescript


