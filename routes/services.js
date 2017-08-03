var express = require('express');
var router = express.Router();

var service = require("../modules/service-module");

/* GET All Services. */
router.get('/', function(req, res, next) {
    service.fetchAll(req, next, function (services) {
        res.send(services || []);
    });
});

/* GET Service. */
router.get('/:id', function(req, res, next) {
    service.fetch(req, next, function (service) {
        res.send(service || {});
    });
});

/* POST Create Service. */
router.post('/', function(req, res, next) {
    service.insert(req, next, function (id) {
        res.location('/services/' + id);
        res.sendStatus(201);
    });
});

/* PUT Update Service. */
router.put('/:id', function(req, res, next) {
    service.update(req, next, function () {
        res.sendStatus(204);
    });
});

/* DELETE Service. */
router.delete('/:id', function(req, res, next) {
    service.remove(req, next, function () {
        res.sendStatus(204);
    });
});

module.exports = router;
