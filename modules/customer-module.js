var customer = require("../models/customer");

var fetchJobs = function(req, next, customer, callback) {
    req.db.jobs.find({customer_id:customer._id.toString()}).toArray(function(error, result){
        if (error) return next(error);
        customer.jobs = result || [];
        callback(customer);
    });
};

var fetchAll = function(req, next, callback, filterBy) {
    var customers = [];

    req.db.customers.find(filterBy || {}, function(error, result) {
        if (error) return next(error);

        function processCustomers(err, customer) {
            if(customer === null) {
                callback(customers);
                return;
            }

            fetchJobs(req, next, customer, function(customer) {
                customers.push(customer);
                result.nextObject(processCustomers);
            });
        }

        result.nextObject(processCustomers);
    });
};

var fetch = function(req, next, callback) {
    console.log('Get Customer id: ', req.params.id);

    if (!req.params || !req.params.id)
        return next(new Error('Invalid params provided.'));

    req.db.customers.findById(req.params.id, function(error, customer) {
        if (error) return next(error);
        if (!customer) return next(new Error('Customer is not found.'));

        fetchJobs(req, next, customer, function(customer) {
            callback(customer);
        });
    });
};

var insert = function(req, next, callback) {
    console.log(req.body);

    var values = customer.create(req, next);
    req.db.customers.insert(values, function(error, result){
        if (error) return next(error);
        if (!result) return next(new Error('Failed to insert.'));
        console.info('Added Customer: ', result);
        callback();
    });
};

var update = function(req, next, callback) {
    console.log('Update Customer id: ', req.params.id);

    if (!req.params || !req.params.id)
        return next(new Error('Invalid params provided.'));

    var values = customer.create(req, next);
    req.db.customers.updateById(req.params.id, {$set:values}, function(error, result) {
        if (error) return next(error);
        if (!result) return next(new Error('Failed to update.'));
        console.log('Customer updated: ', result);
        callback();
    });
};

var remove = function(req, next, callback) {
    console.log('Delete Customer id: ', req.params.id);

    if (!req.params || !req.params.id)
        return next(new Error('Invalid params provided.'));

    req.db.customers.removeById(req.params.id, function(error, result) {
        if (error) return next(error);
        if (!result) return next(new Error('Failed to delete.'));
        console.log('Customer deleted: ', result);
        callback();
    });
};

var rate = function(req, next, callback) {
    console.log('Rate Customer id: ', req.params.id);

    if (!req.params || !req.params.id)
        return next(new Error('Invalid id params provided.'));

    req.db.customers.updateById(req.params.id, {$set:{rating:req.body.rating}}, function(error, result) {
        if (error) return next(error);
        if (!result) return next(new Error('Failed to rate customer.'));
        console.log('Customer rated: ', result);
        callback();
    });
};


exports.fetchAll = fetchAll;
exports.fetch = fetch;
exports.insert = insert;
exports.update = update;
exports.remove = remove ;
exports.rate = rate;