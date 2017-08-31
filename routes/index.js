const express = require('express');
const router = express.Router();
const user = require('../model/schema');
router.get('/', (req,res) => {
	console.log("Hello i am greeting called");
	res.send("hello world");
});

module.exports = router;