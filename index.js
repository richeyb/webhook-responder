const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

const router = express.Router();

const debug = (body, status) => {
  console.log('!! NEW REQUEST !!')
  console.log("\tReceived a request:", status);
  console.log("\tReceived data:", JSON.stringify(body, null, 2));
};

router.post('/:status', (req, res) => {
  const body = req.body;
  debug(body, req.params.status);
  if (req.params.status === '200') {
    res.json(body);
  } else {
    res.sendStatus(req.params.status);
  }
});
router.post('/', (req, res) => {
  const body = req.body;
  debug(body, 200);
  res.json(body);
});
app.use('/', router);

app.listen(port);
console.log(`Server is running on port ${port}`);
