const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) =>{
  res.status(200).send({ 
    "title": 'Vouch - Developer Test: Ticket Xpo',
  });
});

module.exports = router;
