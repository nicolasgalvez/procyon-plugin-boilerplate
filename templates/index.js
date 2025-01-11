/**
 * External template configuration for block creation.
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-create-block/packages-create-block-external-template/
 */
const { join } = require('path')

// get the argument for block slug
const slug = process.argv.slice(2)[0] || 'example'
const defaultValues = {
	namespace: 'procyon',
	slug: 'example',
	title: 'Example Block',
	description: 'An example block from my heart to yours.',
	dashicon: 'heart',
	author: 'Procyon Creative - block builder',
	wpEnv: true,
	// Allow multiple blocks per plugin if a slug is used.
	folderName: slug ? join('src', slug) : 'src/default',
	supports: {
		align: true,
		color: true,
		typography: {
			// Enable support and UI control for font-size.
			fontSize: true,
			// Enable support and UI control for line-height.
			lineHeight: true,
			// Enable support and UI control for text alignment.
			textAlign: true,
		},
		shadow: true,
		spacing: {
			margin: true, // Enable margin UI control.
			padding: true, // Enable padding UI control.
			blockGap: true, // Enables block spacing UI control for blocks that also use `layout`.
		},
	},
	customPackageJSON: { files: ['[^.]*'] },
	updateURI: process.env.updateURI,
	viewScript: null,
	viewScriptModule: 'file:./view.js',
	render: 'file:./render.php',
	example: {},
	npmDevDependencies: [
		'@procyon-creative/plugin-updater',
	],
	customScripts: {
		prestart: 'if [ ! -d vendor ]; then composer install; fi',
		prebuild: 'if [ ! -d vendor ]; then composer install; fi',
		build: 'wp-scripts build --experimental-modules',
		start: 'wp-scripts start --experimental-modules',
		'update-version': `plugin-updater ${slug}`,
	},
	transformer: (view) => {
		return {
			...view,
			// get the env variable for github username.
			githubAccount: process.env.githubAccount,
		}
	},
}

module.exports = {
	defaultValues: defaultValues,
	variants: {
		default: {},
		interactive: {
			description: 'An interactive block with the Interactivity API.',
			npmDependencies: [
				...defaultValues?.npmDependencies ? defaultValues.npmDependencies : [],
				'@wordpress/interactivity',
			],
			blockTemplatesPath: join(__dirname, 'templates', 'interactive',
				'block-templates'),
			supports: {
				...defaultValues.supports,
				interactivity: true,
				ariaLabel: true,
			},
		},
	},
	pluginTemplatesPath: join(__dirname, 'plugin-templates'),
	blockTemplatesPath: join(__dirname, 'block-templates'),
	assetPath: join(__dirname, 'plugin-assets'),
}
