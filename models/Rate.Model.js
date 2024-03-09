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
        },
        score: {
            type: {
                total: Number, 
                count: Number, 
                average: Number 
            },
            default: { total: 0, count: 0, average: 0 }
        }
    },
    {
        timestamps: true
    }
);

rateSchema.pre('save', function (next) {
    const rate = this;
    rate.score.total += rate.rate;
    rate.score.count++;
    rate.score.average = rate.score.total / rate.score.count;
    next();
});

const Rate = model("Rate", rateSchema);

module.exports = Rate;
