const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cohorts = require('./routes/cohorts');
const port = process.env.PORT || 3500;


app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  res.send({cohorts});
});

app.get('/:id', (req, res, next) => {
  const id = req.params.id
  let theCohort = cohorts.filter(cohort => cohort.id == id)[0]
  return (!Number(id) || id > cohorts.length) ? res.json({ error: { status: 400, message: "Please enter a valid ID number" } }) : res.json({ cohort: theCohort })
});

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