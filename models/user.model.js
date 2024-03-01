const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const ROUNDS = 10;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: [true, 'Required field'],
            minlength: [3, "Name must have at least 3 characters"],
            trim: true // para borrar espacios blancos innecesarios al principio o final de la palabra
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Required field'],
            match: [EMAIL_REGEX, 'Add a valid email'],
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, "required field"],
            minlength: [8, "invalid length"],
        },
        role: {
            type: String,
            enum: ['USER', 'ADMIN'],
            default: 'USER'
        },
        biography: {
            type: String,
            default: '',
            maxlength: 250
        },
        birthday: {
            type: Date,
            requiered: false,
            unique: false,
        },
        avatar: {
            type: String,
            requiered: false,
            unique: false,
        },
        comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
        // job: {
        //     type: [String],
        //     requiere: false,
        //     default: false,
        //     typejob: []
        // },
        typejob: {
            type: [String],
            requiere: false,
            default: [],
            enum: ['CARER', 'CARPENTER', 'LOOKSMITH', 'CHEF', 'TEACHER', 'ELECTRICIAN', 'PLUMBER', 'MESSENGER', 'FITTER', 'CLOSET ORGANIZER', 'HOME CLEANER', 'GERDENER', 'PAINTER', 'BRICKWORK', 'WELDER']
        }
        //select de tipo multiple check box
    },
    {

        toJSON: {
            virtuals: true,
            transform: (doc, ret) => {
                // Sirve para cambiar el output de los endpoints cuando hago res.json
                ret.id = ret._id;
                delete ret.__v;
                delete ret._id;
                delete ret.password;
            },
        },
    }
);

// Crear el metodo para comparar contraseñas

userSchema.methods.checkPassword = function (passwordToCompare) {
    return bcrypt.compare(passwordToCompare, this.password);
};

// Presave para guardar la contraseña hasheada

userSchema.pre("save", function (next) {
    if (this.isModified("password")) {
        bcrypt
            .hash(this.password, ROUNDS)
            .then((hash) => {
                this.password = hash;
                next();
            })
            .catch(next);
        // .catch(err => next(err))
    } else {
        next();
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User