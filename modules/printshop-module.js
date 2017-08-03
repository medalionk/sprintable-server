var printshop = require("../models/printshop");

var fetchJobs = function(req, next, printshop, callback) {
    req.db.jobs.find({printshop_id:printshop._id.toString()}).toArray(function(error, result){
        if (error) return next(error);
        printshop.jobs = result || [];
        callback(printshop);
    });
};

var fetchAll = function(req, next, callback, filterBy) {
    var printshops = [];

    req.db.printshops.find(filterBy || {}, function(error, result) {
        if (error) return next(error);

        function processPrintshops(err, printshop) {
            if(printshop === null) {
                callback(printshops);
                return;
            }

            fetchJobs(req, next, printshop, function(printshop) {
                printshops.push(printshop);
                result.nextObject(processPrintshops);
            });
        }

        result.nextObject(processPrintshops);
    });
};

var fetch = function(req, next, callback) {
    console.log('Get Printshop id: ', req.params.id);

    if (!req.params || !req.params.id)
        return next(new Error('Invalid params provided.'));

    req.db.printshops.findById(req.params.id, function(error, printshop) {
        if (error) return next(error);
        if (!printshop) return next(new Error('Printshop is not found.'));

        fetchJobs(req, next, printshop, function(printshop) {
            callback(printshop);
        });
    });
};

var insert = function(req, next, callback) {
    console.log(req.body);

    var values = printshop.create(req, next);
    req.db.printshops.insert(values, function(error, result){
        if (error) return next(error);
        if (!result) return next(new Error('Failed to insert.'));

        var id = result.insertedIds[0].toString();
        console.info('Inserted Printshop ID: ', id);
        callback(id);
    });
};

var update = function(req, next, callback) {
    console.log('Update Printshop id: ', req.params.id);

    if (!req.params || !req.params.id)
        return next(new Error('Invalid params provided.'));

    var values = printshop.create(req, next);
    req.db.printshops.updateById(req.params.id, {$set:values}, function(error, result) {
        if (error) return next(error);
        if (!result) return next(new Error('Failed to update.'));
        console.log('Printshop updated: ', result);
        callback();
    });
};

var remove = function(req, next, callback) {
    console.log('Delete Printshop id: ', req.params.id);

    if (!req.params || !req.params.id)
        return next(new Error('Invalid params provided.'));

    req.db.printshops.removeById(req.params.id, function(error, result) {
        if (error) return next(error);
        if (!result) return next(new Error('Failed to delete.'));
        console.log('Printshop deleted: ', result);
        callback();
    });
};

var rate = function(req, next, callback) {
    console.log('Rate Printshop id: ', req.params.id);

    if (!req.params || !req.params.id)
        return next(new Error('Invalid id params provided.'));

    req.db.printshops.updateById(req.params.id, {$set:{rating:req.body.rating}}, function(error, result) {
        if (error) return next(error);
        if (!result) return next(new Error('Failed to rate printshop.'));
        console.log('Printshop rated: ', result);
        callback();
    });
};


exports.fetchAll = fetchAll;
exports.fetch = fetch;
exports.insert = insert;
exports.update = update;
exports.remove = remove ;
exports.rate = rate;