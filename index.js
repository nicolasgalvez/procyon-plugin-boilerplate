#!/usr/bin/env node

const program = require('commander')
// get minimst
const minimist = require('minimist')
const { spawn } = require('child_process')
// get the version number from package.json
const version = require('./package.json').version

// These will be the defaults for the custom values we are adding.
const defaultValues = {
	updateURI: undefined,
	githubAccount: undefined
}

// set default commander arguments, allow unknown options so we can just snarfle the ones we want.
program.allowUnknownOption().
	version(version).
	description('Create a new WordPress block').
	option('-g, --githubAccount <slug>', 'Your GitHub account name').
	parse(process.argv)

// Remove any extra arguments to avoid causing an error in npx
const argv = process.argv.filter((arg) => {
	// search arg for any of the keys in defaultValues
	const found = Object.keys(defaultValues).some((key) => {
		if(arg.includes(`--${key}`)) {
			// To get around wordpress/create-block not allowing unknown args, we'll use environment variables
			process.env[key] = program.opts()[key]
			return true
		}
	})
	return !found
})

// call npx create-block, pass argv
const child = spawn('npx',
	['@wordpress/create-block', ...argv.slice(2)], { stdio: 'inherit' })

child.on('error', (error) => {
	console.error(`Boilerplate got an error: ${error}`)
})

child.on('exit', (code) => {
	console.log(`Plugin setup complete! ${code}`)
})
