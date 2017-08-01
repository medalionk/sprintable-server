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
    var hjj = req.db;
    res.send('get service: ');
});

/* POST Create Service. */
router.post('/', function(req, res, next) {
    res.send('Create Service');
});

/* PUT Update Service. */
router.put('/:id', function(req, res, next) {
    res.send('Update Service');
});

/* DELETE Service. */
router.delete('/:id', function(req, res, next) {
    res.send('DELETE Service');
});

module.exports = router;
