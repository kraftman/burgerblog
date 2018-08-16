const express = require('express');
const next = require('next');
const apiRouter = require('./routes/api');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const startServer = () => {
  const server = express();

  server.get('/b/:id', (req, res) => {
    const actualPage = '/';
    const queryParams = { id: req.params.id };
    app.render(req, res, actualPage, queryParams);
  });

  server.get('/best', (req, res) => {
    const actualPage = '/';
    const queryParams = { type: 'top', count: 10 };
    app.render(req, res, actualPage, queryParams);
  });

  server.get('/worst', (req, res) => {
    const actualPage = '/';
    const queryParams = { type: 'bottom', count: 10 };
    app.render(req, res, actualPage, queryParams);
  });

  server.get('/icon/:id', (req, res) => {});

  server.use('/api/', apiRouter);

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(80, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:80');
  });
};

app
  .prepare()
  .then(startServer)
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
