const jsonServer = require('json-server');

const server = jsonServer.create();

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
const middlewares = jsonServer.defaults({'bodyParser': true});

const path = require('path');
const router = jsonServer.router(path.join(__dirname, 'data.json'));

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

/**
 * fake connection speed
 */
server.use(function (req, res, next) {
  setTimeout(next, 1000);
});

/**
 * Add custom routes before JSON Server router
 */
server.post('/authenticate', (req, res) => {
  // auth user with jwt token
  if (req.body.username === 'test' && req.body.password === 'test') {
    res.jsonp({
      token: 'fake-jwt-token'
    });
  } else {
    res.jsonp({});
  }
});

server.get('/keepalive', (req, res) => {
  res.jsonp({});
});

server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running');
});
