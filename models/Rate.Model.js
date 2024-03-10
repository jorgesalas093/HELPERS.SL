const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const rateSchema = new Schema(
    {
        postRate: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        receiverRate: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        rate: {
            type: Number,
            min: 1,
            max: 5
        }
    },
    {
        timestamps: true
    }
);

const Rate = model("Rate", rateSchema);

module.exports = Rate;
