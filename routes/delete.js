const express = require('express');
const router = express.Router();
const user = require('../model/schema');
router.delete('/', (req, res) =>{
  user.remove({
    name: req.body.name
  }, (err,user) => {
    if(err) {
      res.json(err);
    } else {
    	console.log('deleted successfully',req.params.id);
     // console.log(user);
     res.json(user);
    }
  });
});

module.exports = router;