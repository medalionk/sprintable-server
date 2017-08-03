var Printshop = function(name, note, address, thumbnail, rating, reg_date) {
    this.name = name;
    this.note = note;
    this.address = address;
    this.thumbnail = thumbnail;
    this.rating = rating;
    this.reg_date = reg_date;
};

exports.create = function(req, next) {
    var body = req.body;
    if (!body || !body.name || !body.address || !body.thumbnail)
        return next(new Error('Invalid data provided.'));

    var printshop = new Printshop(body.name, body.note || '', body.address,
        body.thumbnail, 0.0, new Date());
    return printshop;
};

exports.Printshop = Printshop;