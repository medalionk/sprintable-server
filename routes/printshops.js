var express = require('express');
var router = express.Router();

var printshop = require("../modules/printshop-module");

/* GET All Printshops. */
router.get('/', function(req, res, next) {
    printshop.fetchAll(req, next, function (printshops) {
        res.send(printshops || []);
    });
});

/* GET Printshop. */
router.get('/:id', function(req, res, next) {
    printshop.fetch(req, next, function (printshop) {
        res.send(printshop || {});
    });
});

/* POST Create Printshop. */
router.post('/', function(req, res, next) {
    printshop.insert(req, next, function (id) {
        res.location('/printshops/' + id);
        res.sendStatus(201);
    });
});

/* PUT Update Printshop. */
router.put('/:id', function(req, res, next) {
    printshop.update(req, next, function () {
        res.sendStatus(204);
    });
});

/* DELETE Printshop. */
router.delete('/:id', function(req, res, next) {
    printshop.remove(req, next, function () {
        res.sendStatus(204);
    });
});

/* Rate Printshop. */
router.patch('/:id/rate', function(req, res, next) {
    printshop.rate(req, next, function () {
        res.sendStatus(204);
    });
});

module.exports = router;
