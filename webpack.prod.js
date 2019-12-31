const webpack = require('webpack');
const fs = require('fs');
const glob = require('glob');
const path = require('path');
const merge = require('webpack-merge');
const extractTextPlugin = require('extract-text-webpack-plugin'); 
const baseWebpackConfig = require('./webpack.common.js');

var buildPath = path.resolve(__dirname,'build');

 var teat = merge(baseWebpackConfig,{
//    optimization: {
//       splitChunks: {
//           cacheGroups: {
//               vendor: {
//                   name: "vendor",
//                   test: /[\\/]node_modules[\\/]/,
//                   chunks: "all",
//                   priority: 10 // 优先级
//               },
//               common: {
//                   name: "common",
//                   test: /[\\/]src[\\/]/,
//                   minSize: 1024,
//                   chunks: "all",
//                   priority: 5
//               }
//           }
//       }
//   },
    output: {
        filename: 'js/[name].[chunkhash].js',
        path:buildPath,  
        publicPath:'./'
     },
     module:{
        rules:[
         {
            test:/\.less$/,
            //抽出css
            use:extractTextPlugin.extract({
                  use:[
                        {loader:'css-loader'},
                        {loader:'postcss-loader'
                           //, options:{
                           //     plugins:[
                           //         require("autoprefixer")
                           //       ]
                           // }
                        },
                        {loader:'less-loader'}    
                  ],
                //   use:'happypack/loader?id=styles',
                //   fallback:'style-loader'
               })
             
         },
            { 
                test:/\.(jsx|js)$/, 
                use:[{ loader:'babel-loader' }], 
                // use:'happypack/loader?id=babel',
                exclude:/node_modules/ 
            }
        ]
     }
})

module.exports = teat