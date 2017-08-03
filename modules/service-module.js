var service = require("../models/service");

var fetchAll = function(req, next, callback, filterBy) {
    req.db.services.find(filterBy || {}).toArray(function(error, result){
        if (error) return next(error);
        callback(result);
    });
};

var fetch = function(req, next, callback) {
    console.log('Get Service id: ', req.params.id);

    if (!req.params || !req.params.id)
        return next(new Error('Invalid params provided.'));

    req.db.services.findById(req.params.id, function(error, result) {
        if (error) return next(error);
        if (!result) return next(new Error('Service is not found.'));

        callback(result);
    });
};

var insert = function(req, next, callback) {
    console.log(req.body);

    var values = service.create(req, next);
    req.db.services.insert(values, function(error, result){
        if (error) return next(error);
        if (!result) return next(new Error('Failed to insert.'));

        var id = result.insertedIds[0].toString();
        console.info('Added Service id: ', id);
        callback(id);
    });
};

var update = function(req, next, callback) {
    console.log('Update Service id: ', req.params.id);

    if (!req.params || !req.params.id)
        return next(new Error('Invalid params provided.'));

    var values = service.create(req, next);
    req.db.services.updateById(req.params.id, {$set:values}, function(error, result) {
        if (error) return next(error);
        if (!result) return next(new Error('Failed to update.'));

        console.log('Service updated: ', result);
        callback();
    });
};

var remove = function(req, next, callback) {
    console.log('Delete Service id: ', req.params.id);

    if (!req.params || !req.params.id)
        return next(new Error('Invalid params provided.'));

    req.db.services.removeById(req.params.id, function(error, result) {
        if (error) return next(error);
        if (!result) return next(new Error('Failed to delete.'));

        console.log('Service deleted: ', result);
        callback();
    });
};

exports.fetchAll = fetchAll;
exports.fetch = fetch;
exports.insert = insert;
exports.update = update;
exports.remove = remove ;
