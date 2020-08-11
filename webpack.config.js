const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const path = require('path')
const pkg = require('./package.json')
const buildConfig = require('./buildConfig')

const ENV = process.env.NODE_ENV || 'development'
const BUILD_DOMAIN = process.env.BUILD_DOMAIN || 'localhost'
const ASSET_PATH = process.env.ASSET_PATH || '/'
const VERSION = `v${pkg.version}`
const IS_PROD = ENV === 'production'

const SOURCE_DIR = path.resolve(__dirname, 'src')
const OUTPUT_DIR = path.resolve(__dirname, 'build')
const CLIENT_DIR = path.join(OUTPUT_DIR, VERSION)

const config = buildConfig[BUILD_DOMAIN]
const localeMessages = require('./src/i18n/locale.json')

module.exports = {
	mode: ENV,
	target: 'web',
	context: SOURCE_DIR,
	entry: {
		client: './index.js'
	},
	output: {
		path: CLIENT_DIR,
		publicPath: ASSET_PATH,
		filename: 'assets/[name].[hash:8].js',
		libraryTarget: 'umd'
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all'
				}
			}
		}
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json']
	},
	module: {
		rules: [
			{
				test: /\.(jsx|js)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: IS_PROD ? [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: { minimize: true }
					},
					{
						loader: 'postcss-loader',
						options: { sourceMap: true , plugins: () => [autoprefixer({overrideBrowserslist: 'last 5 versions'})]}
					},
					{
						loader: 'sass-loader',
						options: {
							sassOptions: {
								includePaths: [SOURCE_DIR]
							}
						}
					}
				]: [
          {
						loader: 'style-loader',
						options: { injectType: 'singletonStyleTag' }
					},
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							plugins: () => [autoprefixer(
								{overrideBrowserslist: 'last 5 versions'})]
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sassOptions: {
								includePaths: [SOURCE_DIR]
							}
						}
					}
				]
			},
			{
				test: /.\less$/,
				include: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							plugins: () => [autoprefixer({overridBrowserslist: 'last 5 versions'})]
						}
					},
					{
						loader: 'less-loader',
						options: {
							lessOptions: {
								javascriptEnabled: true
							}
						}
					}
				]
			},
			{
				test: /\.css$/,
				include: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							plugins: () => [autoprefixer({overridBrowserslist: 'last 5 versions'})]
						}
					}
				]
			},
			{
				test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
				use: IS_PROD ? {
					loader: 'file-loader',
					options: {
						name: '[name].[hash:8].[ext]',
						outputPath: 'assets/images'
					}
				}: {
          loader: 'url-loader'
				}
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(ENV),
			'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
			'process.env.BUILD_CONFIG': JSON.stringify(config),
			'process.env.BUILD_LOCALE_MESSAGES': JSON.stringify(localeMessages)
		}),
		new MiniCssExtractPlugin({
			filename: 'assets/css/style.[hash:8].css',
			chunkFilename: 'assets/css/[id].[hash:8].css'
		}),
		new HtmlWebpackPlugin({
			title: 'React App Pro',
			filename: './index.html',
			template: './index.ejs'
		})
	],
	devtool: IS_PROD ? 'srouce-map': 'eval-source-map',
	devServer: {
		port: process.env.PORT || 8900,
		host: 'localhost',
		publicPath: '/',
		contentBase: SOURCE_DIR,
		historyApiFallback: true
	}
}