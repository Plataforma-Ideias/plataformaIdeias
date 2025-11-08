const db = require("../db/conn");

const Idea = db.model("Idea", {
    _id: db.Schema.Types.ObjectId,
    title: String,
    description: String,
    category_id: Number,
    author_id: Number,
    votes: [{
        user_id: Number,
        created_at: Date
    }]
});

module.exports = Idea;