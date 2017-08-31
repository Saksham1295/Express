const express = require('express');
const router = express.Router();
const user = require('../model/schema');

router.post('/', (req,res) => {
	user.create(req.body,(err,user) => {
		if(err)
		{
			console.log("error in insertion");
		}
		else {
			console.log(user);
			res.json(user);
		}
	});
});

module.exports = router;