var job = require("./job-module");

var fetchAll = function(req, next, callback) {
    job.fetchAll(req, next, callback, {status:'PROCESSING'});
};

exports.fetchAll = fetchAll;