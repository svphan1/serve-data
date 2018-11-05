const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cohort = require('../routes/cohort');
const error = require('../routes/error')
const port = process.env.PORT || 3001;


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false}))

app.get('/', (req, res, next) => {
  res.send({cohort});
});

app.get('/:id', (req, res, next) => {
  res.send(cohort[req.params.index-1])
}) ;

app.use(notFound);
app.use(errorHandler);

function notFound(err, req, res, next) {
  res.status(404).send({ error: 'Not found!', status: 404, url: req.originalUrl })
};

function errorHandler(err, req, res, next) {
  console.error('NOPE, LOL', err)
  const stack =  process.env.NODE_ENV !== 'production' ? err.stack : undefined
  res.status(500).send({error: err.message, stack, url: req.originalUrl})
};

app.listen(port, () => 
  console.log(`Your port is on ${port}`)
);

