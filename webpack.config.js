import path from 'path';
import webpack from 'webpack';

const devOnlyConfig = {
  devtool: 'eval',
  //devtool: 'eval-source-map',
  entry: {
    app:[
      'webpack-dev-server/client?http://localhost:5000',
      'webpack/hot/only-dev-server',
      './app/index'
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}

const prodOnlyConfig = {
  entry: {
    app:'./app/index'
  }
}

function makeOutputConfig(env){
  const output = {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js'
  }
  if(env!=='production'){
    output.publicPath = 'http://localhost:5000/static/';
  } else {
    output.publicPath = '/static/';
  }
  return {output};
}

function makeModuleLoaders(env){
  let commonLoaders = [
    {
      test: /\.css?$/,
      loaders: ['style', 'raw']
    }, {
      test: /\.scss?$/,
      loader: 'style!css!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true'
    }, {
      loader: 'url-loader?limit=100000',
      test: /\.(gif|jpg|png|woff.*|woff2|eot.*|otf.*|ttf.*|svg)$/
    }
  ];

  let jsxLoader = {
    test: /\.js?$/,
    loader: 'babel',
    exclude: /node_modules/,
    query:{
      "presets": ["es2015", "react", "stage-0"]
    }
  }

  if(env!=='production'){
    jsxLoader.query.plugins = [
      ["react-transform", {
        "transforms": [{
          "transform": "react-transform-hmr",
          "imports": ["react"],
          "locals": ["module"]
        }]
      }]
    ];
  }

  const loaders = [jsxLoader, ...commonLoaders];

  return {module:{loaders}};
}

let config = {
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};

function makeConfig(env){
  const moduleLoaders = makeModuleLoaders(env);
  const outputConfig = makeOutputConfig(env);
  if(env==='production'){
    return {...prodOnlyConfig, ...config, ...outputConfig, ...moduleLoaders};
  }
  return {...devOnlyConfig, ...config, ...outputConfig, ...moduleLoaders};
}

export default makeConfig;
