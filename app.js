const debug = require('debug')('cbp:app');
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var path = require('path');

var index = require('./routes/index');
var users = require('./routes/users');
debug('loading configuration');
const config = require('./config');
require('./init')(config);

const app = express();

app.enable('trust proxy');
app.set('port', process.env.PORT || 3000);

if (app.get('env') !== 'testing') {
    app.use(logger('dev'));
}
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade')
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));
//Bot routes
const botRoutes = require('./routes');

app.get('/bot', botRoutes.get);
app.post('/bot', botRoutes.receive)
app.use('/', index);
app.use('/users', users);


console.log('port -  ',process.env.PORT);


const server = app.listen(app.get('port'), function () {
    console.log('express server listening on port ' + server.address().port);
});


