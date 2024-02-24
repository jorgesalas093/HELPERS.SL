const mongoose = requiere("mongoose");
const { Schema, model } = mongoose;

const commentSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            red: 'User'
        },
        date: {
            type: Date,
            default: Date.now
        },
        text: {
            type: String,
            requiered: true,
            maxLength: 250
        },
    },

    {
        timestamps: true,
    }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;