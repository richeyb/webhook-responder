const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 9000;

const router = express.Router();

const debug = (body, status) => {
  console.log('!! NEW REQUEST !!');
  console.log('\tReceived a request:', status);
  console.log('\tReceived data:', JSON.stringify(body, null, 2));
};

router.post('/:status', (req, res) => {
  const body = req.body;
  if (req.params.status === '200') {
    res.json(body);
  } else {
    res.sendStatus(req.params.status);
  }
});
router.post('/', (req, res) => {
  const { body, headers } = req;
  console.log('Headers:', headers);
  console.log('Body:', body);
  res.json({ headers, body });
});
router.get('/', (req, res) => {
  res.json({
    message: 'Echo Server - Up and Running'
  });
});
app.use('/', router);

app.listen(port);
console.log(`Server is running on port ${port}`);
