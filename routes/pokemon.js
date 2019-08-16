var router = require('express').Router();

router.get('/', (req, res) => {
  res.send(`Render a page of favorites here`);
});

router.post('/', (req, res) => {
  res.send(req.body);
});

module.exports = router;

