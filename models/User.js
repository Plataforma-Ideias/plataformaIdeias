const db = require("../db/conn");

const User = db.model("User", {
    _id: db.Schema.Types.ObjectId,
    type: String,
    email: String,
    password: String,
});

module.exports = User;



