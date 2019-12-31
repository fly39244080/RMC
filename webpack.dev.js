const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const merge = require('webpack-merge');
const extractTextPlugin = require('extract-text-webpack-plugin'); 
const baseWebpackConfig = require('./webpack.common.js');
var buildPath = path.resolve(__dirname,'dev');

module.exports = merge(baseWebpackConfig,{
    output: {
        filename: '[name].js',
        path:buildPath,  
        publicPath:'/'
     },
     module:{
        rules:[
            {
                test:/\.less$/,
                //抽出css
                use:extractTextPlugin.extract({
                      use:[
                            {loader:'css-loader'},
                            {loader:'less-loader'}    
                      ],
                      fallback:'style-loader'
                   })
             },
             
        ]
     },
    devServer:{
        contentBase:buildPath,
        host:'0.0.0.0',
        port:'3200',
        historyApiFallback: true,
        open:false,
        publicPath:'/',
        useLocalIp:true,
        proxy: {
            "/api": {
              target: "http://localhost:3000",  //接口的服务
              secure: false
            }
          }
    }
})