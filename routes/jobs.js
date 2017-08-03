var express = require('express');
var router = express.Router();

var job = require("../models/job");

/* GET All Jobs. */
router.get('/', function(req, res, next) {
    var jobs = [];

    req.db.jobs.find({}, function(error, result) {
        if (error) return next(error);

        function processJobs(err, job) {
            if(job === null) {
                res.send(jobs);
                return;
            }

            req.db.services.findById(job.customer_id, function(error, customer) {
                if (error) return next(error);
                if (!customer) return next (new Error('Customer not found.'));
                job.customer = customer;
                jobs.push(job);
                result.nextObject(processJobs);
            });
        }

        result.nextObject(processJobs);
    });
});

/* GET Job. */
router.get('/:id', function(req, res, next) {
    console.log('Get Job id: ', req.params.id);

    if (!req.params || !req.params.id)
        return next(new Error('Invalid params provided.'));

    req.db.jobs.findById(req.params.id, function(error, result) {
        if (error) return next(error);
        if (!result) return next(new Error('Job is not found.'));
        res.send(result);
    });
});

/* POST Create Service. */
router.post('/', function(req, res, next) {
    console.log(req.body);

    var values = job.create(req, next);
    req.db.jobs.insert(values, function(error, result){
        if (error) return next(error);
        if (!result) return next(new Error('Failed to insert.'));
        console.info('Added Job: ', result);
        res.send(200);
    });
});

/* PUT Update Service. */
router.put('/:id', function(req, res, next) {
    console.log('Update Job id: ', req.params.id);

    if (!req.params || !req.params.id)
        return next(new Error('Invalid params provided.'));

    var values = job.create(req, next);
    req.db.jobs.updateById(req.params.id, {$set:values}, function(error, result) {
        if (error) return next(error);
        if (!result) return next(new Error('Failed to update.'));
        console.log('Job updated: ', result);
        res.send(200);
    });
});

/* DELETE Service. */
router.delete('/:id', function(req, res, next) {
    console.log('Delete Job id: ', req.params.id);

    if (!req.params || !req.params.id)
        return next(new Error('Invalid params provided.'));

    req.db.jobs.removeById(req.params.id, function(error, result) {
        if (error) return next(error);
        if (!result) return next(new Error('Failed to delete.'));
        console.log('Job deleted: ', result);
        res.send(200);
    });
});

module.exports = router;
