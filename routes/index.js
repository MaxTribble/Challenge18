const router = require('express').Router();
const apiRoutes = require('./api');
// using the routes from the api folder index and setting them to base route api
router.use('/api', apiRoutes);

router.use((req, res) => {
  return res.send('Wrong route!');
});

module.exports = router;