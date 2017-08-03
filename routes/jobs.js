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

/* POST Create Job. */
router.post('/', function(req, res, next) {
    job.insert(req, next, function (job) {
        res.sendStatus(200);
    });
});

/* PUT Update Job. */
router.put('/:id', function(req, res, next) {
    job.update(req, next, function (job) {
        res.sendStatus(200);
    });
});

/* DELETE Job. */
router.delete('/:id', function(req, res, next) {
    job.remove(req, next, function (job) {
        res.sendStatus(200);
    });
});

/* Accept Job. */
router.patch('/:id/accept', function(req, res, next) {
    job.accept(req, next, function (job) {
        res.sendStatus(200);
    });
});

/* Reject Job. */
router.patch('/:id/reject', function(req, res, next) {
    job.reject(req, next, function (job) {
        res.sendStatus(200);
    });
});

/* Close Job. */
router.patch('/:id/close', function(req, res, next) {
    job.close(req, next, function (job) {
        res.sendStatus(200);
    });
});

module.exports = router;
