const PORT = 8000,
      cors = require('cors'),
      path = require('path'),
      Yelp = require('yelp');
      morgan = require('morgan'),
      express = require('express'),
      webpack = require('webpack'),
      bodyParser = require('body-parser'),
      webpackConfig = require('./webpack.config'),
      webpackDevMiddleware = require('webpack-dev-middleware'),
      webpackHotMiddleware = require('webpack-hot-middleware')

const Yelps = require('./models/yelpFunctions');


//Express invocation
const app = express()

//Middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Webpack Configuration
const compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath, noInfo: true
}))
app.use(webpackHotMiddleware(compiler))

// Routes
app.get('/test', (req, res) => {
  res.send('Hiya buddy')
})

app.post('/search', (req, res) => {
  console.log('in app.js');
  console.log('app.js req.body',req.body)
  var yelp = new Yelp({
      consumer_key: 'GWGv4SyWY5noNEPRtcvb5w',
      consumer_secret: '4mahGaK-aAGV6LVlva1IiAW2DtA',
      token: 'nzElqK4xjo5lt_t2puxNnFKrklMILM-l',
      token_secret: 'ZhhgTnz8xLLMA5SOyvs6N88THRk',
    });
    yelp.search(req.body)
      .then(function (data) {
        console.log('data: ', data)
        res.send(data)
      })
      .catch(function (err) {
        console.error(err);
      });
})

app.post('/favourites', (req, res) => {
  console.log('in app.js');
  console.log(req.body)
  Yelps.favourites(req.body)
    .then((data) => { res.send(data); })
    .catch((err) => { res.status(400).send(err); })
  });

app.listen(PORT, err => {
  console.log( err || `Express listening on port ${8000}`)
})
