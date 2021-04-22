/********************** IMPORTS **********************/
const express = require('express');

/********************** MAIN **********************/
const router = express.Router();

router.get('/messanger', (req, res) => {
    res.send({ response: 'Messanger server is currently running' }).status(200);
});

module.exports = router;