var express = require('express');
var router = express.Router();

/* GET All Services. */
router.get('/', function(req, res, next) {
    req.db.services.find().toArray(function(error, result){
        if (error) return next(error);
        res.send(result || []);
    });
});

/* GET Service. */
router.get('/:id', function(req, res, next) {
    console.log('Service id: ', req.params.id);
    req.db.services.findById(req.params.id, function(error, result) {
        if (error) return next(error);
        if (!result) return next(new Error('Service is not found.'));
        res.send(result || []);
    });
});

/* POST Create Service. */
router.post('/', function(req, res, next) {
    console.log(req.body);

    if (!req.body || !req.body.name || !req.body.note || !req.body.cost || !req.body.duration)
        return next(new Error('Invalid data provided.'));

    req.db.services.insert({
        name: req.body.name,
        note: req.body.note,
        cost: req.body.cost,
        duration: req.body.duration
    }, function(error, service){
        if (error) return next(error);
        if (!service) return next(new Error('Failed to save.'));
        console.info('Added Service');
        res.send(200);
    });
});

/* PUT Update Service. */
router.put('/:id', function(req, res, next) {
    console.log('Service id: ', req.params.id);
    req.db.services.findOne({_id: req.createHexID(req.params.id)}, function(error, result) {
        if (error) return next(error);
        res.send(result || []);
    });
    res.send('Update Service');
});

/* DELETE Service. */
router.delete('/:id', function(req, res, next) {
    console.log('Service id: ', req.params.id);
    req.db.services.findOne({_id: req.createHexID(req.params.id)}, function(error, result) {
        if (error) return next(error);
        res.send(result || []);
    });
    res.send('DELETE Service');
});

module.exports = router;
