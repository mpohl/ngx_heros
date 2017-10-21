const jsonServer = require('json-server');
const server = jsonServer.create();

const middlewares = jsonServer.defaults();

const path = require('path');
const router = jsonServer.router(path.join(__dirname, 'data.json'));

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

server.use(function (req, res, next) {
  setTimeout(next, 1000);
});

// Add custom routes before JSON Server router
/*
server.get('/authenticate', (req, res) => {
  res.jsonp(req.query);
});
*/

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.url === '/authenticate') {
    if (req.method === 'POST') {
      res.status(200);
      res.jsonp({
        token: 'fake-jwt-token'
      });
    }
  }
  // Continue to JSON Server router
  next();
});

server.use(router);


server.listen(3000, () => {
  console.log('JSON Server is running');
});
