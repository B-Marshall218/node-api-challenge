const express = require("express");

const router = express.Router()

const Projects = require("../data/helpers/projectModel");

const Actions = require("../data/helpers/actionModel");

router.get("/", (req, res) => {
    Actions.get()
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ errormessage: "This didn't work" });
        })
})

router.post("/", (req, res) => {

    Actions.insert(req.body)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errormessage: "This didn't work" })
        });
})


router.put("/:id", (req, res) => {
    const change = req.body
    Actions.update(req.params.id, change)
        .then(action => {
            if (action) {
                res.status(200).json(action)
            } else {
                res.status(400).json({ errormessage: "please provide name and description for action" })
            }
        })
        .catch(err => {
            res.status(500).json({ errormessage: "this didnt update", err })
        })
})

router.delete("/:id", (req, res) => {
    Actions.remove(req.params.id)
        .then(action => {
            if (action > 0) {
                res.status(200).json({ message: "delete was successful", action })
            } else {
                res.status(400).json({ errorMessage: "this userid does not exist" })
            }
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "something brokeadid", err })
        })
})

module.exports = router