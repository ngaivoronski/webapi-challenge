const express = require('express');

const router = express.Router();

const actionDb = require('../helpers/actionModel');

// custom middleware

function validateActionID(req, res, next) {
    actionDb.get(req.params.id)
        .then(act => {
            if(act && act.id) {
                next();
            } else {
                res.status(400).json({  message: "Action ID does not exist." });
            }
        })
        .catch(err => {
            res.status(500).json({ error: "Database error." });
        });
}

// CRUD

// Get a list of actions from the action database

router.get('/', (req, res) => {
    actionDb.get()
        .then( projects => {
        res.status(200).json(projects);
        })
        .catch(err => {
        res.status(500).json({ error: "Actions could not be retrieved." });
        })
});

// Get a specific action by ID (disregarding project id)

router.get('/:id', validateActionID, (req, res) => {
    actionDb.get(req.params.id)
    .then(action => {
    res.status(200).json(action);
    })
    .catch(err => {
    res.status(500).json({ error: "Action could not be retrieved." });
    })
});

module.exports = router;
