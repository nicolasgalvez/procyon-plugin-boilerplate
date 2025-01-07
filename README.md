# Procyon Plugin Boilerplate
## Description
A starter project to help create a new WordPress Block Plugin. This includes an update system using yahnis-elsts/plugin-update-checker and a Github action to build zip files and releases so you can update the plugin right from WordPress.

## Usage
Note that this is under development, so it probably doesn't work at all. But if you want to try it out, you can do the following:

1. Clone the repo
2. In your plugins directory, run `npx @wordpress/create-block test --template=<path-to-cloned-repo>/procyon-plugin-boilerplate --interactive`

This will scaffold a new block plugin in the `test` folder.

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

### Variants

* interactive (mostly works)
* typescript (might work)
* default (not working)

## Features
- [x] Create a new block plugin
- [x] Allow multiple blocks per plugin
- [] Add wrapper to allow custom options instead of env variables
- [] Update the Github action to build the plugin zip file
- [] Clean up the variants
- [] Linting
- [] Tests (BTW, if anyone knows a smooth way to test Github Actions locally, please let me know. I was using act, but it doesn't compile on my M2 Mac)

## Development

### Updating a new version

1. Ensure the readme.txt version is updated
2. Ensure the plugin.json version is updated
3. Create a new tag for release either at github.com or using git tag v0.1.x -m "message"
4. Push the tag to github using `git push origin v0.1.x`

There is github action that will automatically build the zip file for release and create a new release. The zip file will be available in the release assets. Any site with the plugin installed will now be able to update the plugin.

