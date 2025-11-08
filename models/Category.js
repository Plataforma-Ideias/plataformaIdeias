const db = require("../db/conn");

const Category = db.model("Category", {
    _id: db.Schema.Types.ObjectId,
    name: String,
});

module.exports = Category;