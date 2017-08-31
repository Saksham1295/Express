const express = require('express');
const router = express.Router();
const user = require('../model/schema');
router.put('/:name', (req,res) => {
	user.update({name: req.params.name},
		{$set: {age: req.body.age, address: req.body.address }},
		(err,user) => {
				if(err) {
					console.log("error in updation", err);
				}
				else {
					console.log("updated");
					res.json(user);
				}
			}
		);
});
module.exports = router;