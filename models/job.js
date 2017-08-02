var Status = {
    OPEN: "OPEN",
    ACCEPTED: "ACCEPTED",
    REJECTED: "REJECTED",
    PROCESSING: "PROCESSING",
    CLOSED: "CLOSED"
};

var Job = function(title, description, created_date, delivery_date, price, quantity,
                   delivery_address, image, status, customerID) {
    this.title = title;
    this.description = description;
    this.created_date = created_date;
    this.delivery_date = delivery_date;
    this.price = price;
    this.quantity = quantity;
    this.delivery_address = delivery_address;
    this.image = image;
    this.status = status;
    this.customerID = customerID;
};

exports.create = function(req, next) {
    var body = req.body;
    if (!body || !body.title || !body.description || !body.delivery_date || !body.price
        || !body.quantity || !body.delivery_address || !body.image || !body.customerID)
        return next(new Error('Invalid data provided.'));

    var job = new Job(body.title, body.description, new Date(), body.delivery_date, body.price,
        body.quantity, body.delivery_address, body.image, Status.OPEN, body.customerID);
    return job;
};

exports.Job = Job;
exports.Status = Status;
