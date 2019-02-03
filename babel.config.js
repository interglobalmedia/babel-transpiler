module.exports = {
	presets: [
		['@babel/preset-env'], '@babel/preset-react'
	],
	ignore: [/[/\\]core-js/, /@babel[/\\]tuntime/],
	plugins: [
		'@babel/plugin-proposal-class-properties',
		'@babel/plugin-syntax-dynamic-import',
		'@babel/plugin-proposal-export-namespace-from',
		'@babel/plugin-proposal-throw-expressions',
		'@babel/plugin-transform-modules-commonjs',
		'@babel/plugin-proposal-export-default-from',
		'@babel/plugin-proposal-object-rest-spread',
		'@babel/plugin-transform-object-assign'
	]
}