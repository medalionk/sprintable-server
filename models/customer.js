var Customer = function(name, note, contact, thumbnail, rating, reg_date) {
    this.name = name;
    this.note = note;
    this.contact = contact;
    this.thumbnail = thumbnail;
    this.rating = rating;
    this.reg_date = reg_date;
};

exports.create = function(req, next) {
    var body = req.body;
    if (!body || !body.name || !body.contact || !body.thumbnail)
        return next(new Error('Invalid data provided.'));

    var customer = new Customer(body.name, body.note || '', body.contact,
        body.thumbnail, 0.0, new Date());
    return customer;
};

exports.Customer = Customer;
