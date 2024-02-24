const mongoose = require('mongoose');
const { Schema } = mongoose;

const rateSchema = new Schema(
    {
rate:{
    type: Number,
    max: 5 //revisar no estoy seguro

}
    },

    {
        timestamps: true,
    }
);

const rate = model("Rate", rateSchema);

module.exports = rate;