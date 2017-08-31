const express = require('express');
const router = express.Router();
const user = require('../model/schema');
router.get('/', (req,res) => {
	user.find((err,data) => {
		if(err){
			console.log(err);
			res.send(err);
		}
		else{
			console.log(data);
			res.json(data);
		}
	})
});

module.exports = router;