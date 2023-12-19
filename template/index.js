// Create External Project Template for @wordpress/create-block
// @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-create-block/packages-create-block-external-template/

const { join } = require( 'path' );

module.exports = {
    pluginTemplatesPath: join( __dirname, 'plugin-templates' ),
    blockTemplatesPath: join( __dirname, 'block-templates' ),
    assetsPath: join( __dirname, 'plugin-assets' ),
    defaultValues: {
        // Header fields
        slug: 'procyon-plugin-boilerplate',
        title: 'Procyon Plugin Boilerplate',
        dashicon: 'palmtree',
        version: '1.0.0',
        'wpEnv': false,
        'pluginURI': 'https://github.com/nicolasgalvez/procyon-plugin-boilerplate',
        // Package.json custom values
        'customPackageJSON': {
            "files": [
                "vendor",
                "inc",
                "build",
                "*.php",
                "readme.txt",
                "plugin.json"
            ],
        },
        // Block metadata
        folderName: 'build', // the location for the block.json file and other optional block files generated from block templates included in the folder set with the blockTemplatesPath setting
        textDomain: 'procyon-boilerplate',
        namespace: 'procyon-boilerplate',
    },
};
