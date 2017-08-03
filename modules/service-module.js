var express = require('express');
var router = express.Router();

var service = require("../models/service");

/* GET All Services. */
router.get('/', function(req, res, next) {
    req.db.services.find().toArray(function(error, result){
        if (error) return next(error);
        res.send(result || []);
    });
});

/* GET Service. */
router.get('/:id', function(req, res, next) {
    console.log('Get Service id: ', req.params.id);

    if (!req.params || !req.params.id)
        return next(new Error('Invalid params provided.'));

    req.db.services.findById(req.params.id, function(error, result) {
        if (error) return next(error);
        if (!result) return next(new Error('Service is not found.'));
        res.send(result);
    });
});

/* POST Create Service. */
router.post('/', function(req, res, next) {
    console.log(req.body);

    var values = service.create(req, next);
    req.db.services.insert(values, function(error, result){
        if (error) return next(error);
        if (!result) return next(new Error('Failed to insert.'));
        console.info('Added Service: ', result);
        res.send(200);
    });
});

/* PUT Update Service. */
router.put('/:id', function(req, res, next) {
    console.log('Update Service id: ', req.params.id);

    if (!req.params || !req.params.id)
        return next(new Error('Invalid params provided.'));

    var values = service.create(req, next);
    req.db.services.updateById(req.params.id, {$set:values}, function(error, result) {
        if (error) return next(error);
        if (!result) return next(new Error('Failed to update.'));
        console.log('Service updated: ', result);
        res.send(200);
    });
});

/* DELETE Service. */
router.delete('/:id', function(req, res, next) {
    console.log('Delete Service id: ', req.params.id);

    if (!req.params || !req.params.id)
        return next(new Error('Invalid params provided.'));

    req.db.services.removeById(req.params.id, function(error, result) {
        if (error) return next(error);
        if (!result) return next(new Error('Failed to delete.'));
        console.log('Service deleted: ', result);
        res.send(200);
    });
});

module.exports = router;
