const path = require('path')
const fs = require('fs')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const globImporter = require('node-sass-glob-importer');
const webpack = require('webpack')

const PATHS = {
    src: path.join(__dirname, '/src'),
    dist: path.join(__dirname, '/dist'),
    assets: 'assets/'
}

const PAGES_DIR = `${PATHS.src}\\pages\\`
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'))

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },

	output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },

    mode: 'development',
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, './dist'),
        open: true,
        compress: true,
        hot: true,
        port: 8080,
    },

	plugins: [
        // new HtmlWebpackPlugin({
        //     title: 'webpack Boilerplate',
        //     template: path.resolve(__dirname, './src/template.html'), // шаблон
        //     filename: 'index.html', // название выходного файла
        // }),
        new webpack.HotModuleReplacementPlugin(),
		new MiniCssExtractPlugin(),
        new CopyWebpackPlugin({ 
            patterns: [
            { from: 'src/modules/**/img/*', to: 'img/[name][ext]' },
            { from: 'src/icons/*', to: 'icons/[name][ext]' }
            ]
        }),
        ...PAGES.map(page => new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/${page}`,
            filename: `./${page.replace(/\.pug/,'.html')}`,
            inject : true
        }))
    ],

	module: {
        rules: [
            {
                test: /\.pug$/,
                loader: 'pug-loader'
            },
            // изображения
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
			// шрифты и SVG
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
			// CSS, PostCSS, Sass
            {
                test: /\.(scss|sass)$/,
				use: [
				MiniCssExtractPlugin.loader,
				"css-loader",
				{
					loader: "sass-loader",
					options: {
					sassOptions: {
						importer: globImporter()
					}
					}
				}
				]
            },
        ],
    },
}