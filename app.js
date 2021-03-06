var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var data = require('./data');
var weixin = require('./weixin');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'robotcat',
  saveUninitialized: true,
  resave: false,
  store: new redisStore({
    host: 'localhost',
    port: 6379,
    db: 3
  })
}));


// 设置根目录和API目录
// =============================================================================
var routes = require('./routes/index');
var weixinAPI = require('./weixin/weixin');
var feeling = require('./routes/stock/feeling');
var stock = require('./routes/stock/stock');
var trade = require('./routes/stock/trade');
var topic = require('./routes/stock/topic');
var frequence = require('./routes/stock/frequence');

app.use('/', routes);
app.use('/api',feeling);
app.use('/api',stock);
app.use('/api',trade);
app.use('/api',topic);
app.use('/api',frequence);
weixinAPI(app);


// 跑批工作
// =============================================================================
data.schedule();
weixin.schedule();




module.exports = app;
