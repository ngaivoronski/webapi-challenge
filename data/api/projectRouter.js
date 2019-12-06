const express = require('express');

const router = express.Router();

const projectDb = require('../helpers/projectModel');

// custom middleware

function validateProjectID(req, res, next) {
    projectDb.get(req.params.id)
        .then(proj => {
            if(proj && proj.id) {
                next();
            } else {
                res.status(400).json({  message: "Project ID does not exist." });
            }
        })
        .catch(err => {
            res.status(500).json({ error: "Database error." });
        });
}

function validateProject(req, res, next) {
    if(req.body && req.body.name && req.body.description) {
        next();
    } else if (req.body && req.body.name) {
        res.status(400).json({ message: "Missing required description field." });
    } else if (req.body && req.body.description) {
        res.status(400).json({ message: "Missing required name field." });
    } else if (req.body) {
        res.status(400).json({ message: "Missing required name and description fields." });
    } else {
        res.status(400).json({ message: "Missing project data." })
    }
}

// CRUD

// Get a list of projects

router.get('/', (req, res) => {
    projectDb.get()
    .then(projects => {
    res.status(200).json(projects);
    })
    .catch(err => {
    res.status(500).json({ error: "Projects could not be retrieved." });
    })
});

// Get a specific project by ID

router.get('/:id', validateProjectID, (req, res) => {
    projectDb.get(req.params.id)
    .then(project => {
    res.status(200).json(project);
    })
    .catch(err => {
    res.status(500).json({ error: "Projects could not be retrieved." });
    })
});

// Add a project

router.post('/', validateProject, (req, res, next) => {
    projectDb.insert(req.body)
    .then(project => {
        res.status(201).json(project);
    })
    .catch(err => {
        res.status(500).json({ error: "There was an error adding the project." });
    });
});

// Edit a project

router.put('/:id', validateProjectID, validateProject, (req, res, next) => {
    projectDb.update(req.params.id, req.body)
    .then(project => {
        res.status(201).json(project);
    })
    .catch(err => {
        res.status(500).json({ error: "There was an error adding the project." });
    });
});

// Delete a project

router.delete('/:id', validateProjectID, (req, res, next) => {
    projectDb.remove(req.params.id)
    .then(confirmation => {
        if (confirmation > 0) {
            res.status(201).json({ message: "Project was successfully deleted." });
        } else {
            res.status(500).json({ error: "There was an error deleting the project." });
        }
    })
    .catch(err => {
        res.status(500).json({ error: "There was an error adding the project." });
    });
});


module.exports = router;
