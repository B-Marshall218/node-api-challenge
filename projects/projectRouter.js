const express = require("express");

const router = express.Router()

const Projects = require("../data/helpers/projectModel");



router.get("/", (req, res) => {
    Projects.get()
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ errormessage: "This didn't work" });
        })
})

router.get("/:id/actions"), (req, res) => {
    Projects.getProjectActions(req.params.id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            res.status(500).json({ errormessage: "it don't work", err })
        })

}

router.post("/", validateProject, (req, res) => {

    Projects.insert(req.body)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errormessage: "This didn't work" })
        });
})


router.put("/:id", (req, res) => {
    const change = req.body
    Projects.update(req.params.id, change)
        .then(project => {
            if (project) {
                res.status(200).json(project)
            } else {
                res.status(400).json({ errormessage: "please provide name and description for project" })
            }
        })
        .catch(err => {
            res.status(500).json({ errormessage: "this didnt update", err })
        })
})

router.delete("/:id", (req, res) => {
    Projects.remove(req.params.id)
        .then(project => {
            if (project > 0) {
                res.status(200).json({ message: "delete was successful", project })
            } else {
                res.status(400).json({ errorMessage: "this userid does not exist" })
            }
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "something brokeadid", err })
        })
})

function validateProject(req, res, next) {
    if (req.body) {
        next()
    } else {
        res.status(400).json({ message: "Missing project name" })
    }
}

module.exports = router