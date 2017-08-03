var express = require('express');
var router = express.Router();

var wip = require("../modules/wip-module");

/* GET All Jobs. */
router.get('/', function(req, res, next) {
    wip.fetchAll(req, next, function (wips) {
        res.send(wips || []);
    });
});

module.exports = router;
