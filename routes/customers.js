var express = require('express');
var router = express.Router();

var customer = require("../modules/customer-module");

/* GET All Customers. */
router.get('/', function(req, res, next) {
    customer.fetchAll(req, next, function (customers) {
        res.send(customers || []);
    });
});

/* GET Customer. */
router.get('/:id', function(req, res, next) {
    customer.fetch(req, next, function (customer) {
        res.send(customer || {});
    });
});

/* POST Create Customer. */
router.post('/', function(req, res, next) {
    customer.insert(req, next, function (customer) {
        res.sendStatus(200);
    });
});

/* PUT Update Customer. */
router.put('/:id', function(req, res, next) {
    customer.update(req, next, function (customer) {
        res.sendStatus(200);
    });
});

/* DELETE Customer. */
router.delete('/:id', function(req, res, next) {
    customer.remove(req, next, function (customer) {
        res.sendStatus(200);
    });
});

/* Rate Customer. */
router.patch('/:id/rate', function(req, res, next) {
    customer.rate(req, next, function (customer) {
        res.sendStatus(200);
    });
});

module.exports = router;
