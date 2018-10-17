const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;
const cohort = require('cohort');

app.use(cors())
app.get('/', (req, res, next) => {
  res.send({cohort});
})

app.listen(port, () => 
  console.log(`Your port is on ${port}`)
);

