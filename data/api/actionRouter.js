const express = require('express');

const router = express.Router();

const actionDb = require('../helpers/actionModel');

// custom middleware


// CRUD

router.get('/', (req, res) => {
    actionDb.get()
        .then( projects => {
        res.status(200).json(projects);
        })
        .catch(err => {
        res.status(500).json({ error: "Actions could not be retrieved." });
        })
});

module.exports = router;
