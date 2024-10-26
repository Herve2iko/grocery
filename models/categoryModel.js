const mongoose = require("mongoose");

const category = mongoose.model(
    "Category",
    mongoose.Schema(
        {
            nom:{
                type: String,
                required: true,
                unique: true,
            },
            description: {
                type: String,
                required: false
            },
            image: {
                type: String
            }
        }
    )
)
module.exports = {category}