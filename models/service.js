var Service = function(name, note, cost, duration) {
    this.name = name;
    this.note = note;
    this.cost = cost;
    this.duration = duration;
};

exports.create = function(req, next) {
    var body = req.body;
    if (!body || !body.name || !body.note || !body.cost || !body.duration)
        return next(new Error('Invalid data provided.'));

    var service = new Service(body.name, body.note, body.cost, body.duration);
    return service;
};

exports.Service = Service;
