var express = require('express');
var router = express.Router();

var job = require("../modules/job-module");

/* GET All Jobs. */
router.get('/', function(req, res, next) {
    job.fetchAll(req, next, function (jobs) {
        res.send(jobs || []);
    });
});

/* GET Job. */
router.get('/:id', function(req, res, next) {
    job.fetch(req, next, function (job) {
        res.send(job || {});
    });
});

/* POST Create Service. */
router.post('/', function(req, res, next) {
    job.insert(req, next, function () {
        res.send(200);
    });
});

/* PUT Update Service. */
router.put('/:id', function(req, res, next) {
    job.update(req, next, function (job) {
        res.send(200);
    });
});

/* DELETE Service. */
router.delete('/:id', function(req, res, next) {
    job.remove(req, next, function (job) {
        res.send(200);
    });
});

module.exports = router;
