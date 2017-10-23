const jsonServer = require('json-server');

const server = jsonServer.create();

const middlewares = jsonServer.defaults();


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

// Add custom routes before JSON Server router
/*
server.get('/echo', (req, res) => {
  res.jsonp(req.query);
});
*/

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.url === '/authenticate' && req.method === 'POST') {
    res.status(200);
    if (req.body.username === 'test' && req.body.password === 'test') {
      res.jsonp({
        token: 'fake-jwt-token'
      });
    } else {
      res.jsonp({});
    }
  } else {
    // Continue to JSON Server router
    next();
  }
});

server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running');
});
