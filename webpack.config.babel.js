import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, 'demo/index.html'),
    filename: './index.html'
});

export default () => ({
    entry: './demo/index.jsx',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [htmlWebpackPlugin],
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devServer: {
        port: 8000
    }
});
