const router = require('express').Router()

/* GET home page. */
router.get('/', (req, res, next) =>{
  res.status(200).send({ 
    "message": 'Please go to /xpo/v1',
  })
})

module.exports = router