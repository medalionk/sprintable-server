var express = require('express');
var router = express.Router();

var jobs = require("../models/job");

/* GET All Jobs. */
router.get('/', function(req, res, next) {
    req.db.jobs.find().toArray(function(error, result){
        if (error) return next(error);
        res.send(result || []);
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

    var values = jobs.create(req, next);
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

    var values = jobs.create(req, next);
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
