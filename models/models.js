var Service = function(name, note, cost, duration) {
    this.name = name;
    this.note = note;
    this.cost = cost;
    this.duration = duration;
};

Service.create = function(name, note, cost, duration) {
    var service = new Service(name, note, cost, duration);
    return service;
};

exports.Service = Service;
