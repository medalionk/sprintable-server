var job = require("../models/job");

var fetchCustomer = function(req, next, job, postFetch) {
    req.db.services.findById(job.customer_id, function(error, customer) {
        if (error) return next(error);
        if (!customer) return next (new Error('Customer not found.'));
        job.customer = customer;
        postFetch(job);
    });
};

var fetchAll = function(req, next, callback) {
    var jobs = [];

    req.db.jobs.find({}, function(error, result) {
        if (error) return next(error);

        function processJobs(err, job) {
            if(job === null) {
                callback(jobs);
                return;
            }

            fetchCustomer(req, next, job, function(job) {
                jobs.push(job);
                result.nextObject(processJobs);
            });
        }

        result.nextObject(processJobs);
    });
};

var fetch = function(req, next, callback) {
    console.log('Get Job id: ', req.params.id);

    if (!req.params || !req.params.id)
        return next(new Error('Invalid params provided.'));

    req.db.jobs.findById(req.params.id, function(error, job) {
        if (error) return next(error);
        if (!job) return next(new Error('Job is not found.'));

        fetchCustomer(req, next, job, function(job) {
            callback(job);
        });
    });
};

var insert = function(req, next, callback) {
    console.log(req.body);

    var values = job.create(req, next);
    req.db.jobs.insert(values, function(error, result){
        if (error) return next(error);
        if (!result) return next(new Error('Failed to insert.'));
        console.info('Added Job: ', result);
        callback();
    });
};

var update = function(req, next, callback) {
    console.log('Update Job id: ', req.params.id);

    if (!req.params || !req.params.id)
        return next(new Error('Invalid params provided.'));

    var values = job.create(req, next);
    req.db.jobs.updateById(req.params.id, {$set:values}, function(error, result) {
        if (error) return next(error);
        if (!result) return next(new Error('Failed to update.'));
        console.log('Job updated: ', result);
        callback();
    });
};

var remove = function(req, next, callback) {
    console.log('Delete Job id: ', req.params.id);

    if (!req.params || !req.params.id)
        return next(new Error('Invalid params provided.'));

    req.db.jobs.removeById(req.params.id, function(error, result) {
        if (error) return next(error);
        if (!result) return next(new Error('Failed to delete.'));
        console.log('Job deleted: ', result);
        callback();
    });
};

exports.fetchAll = fetchAll;
exports.fetch = fetch;
exports.insert = insert;
exports.update = update;
exports.remove = remove;