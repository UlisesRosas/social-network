// Mongoose schema constructor
const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: [true, 'User Name is Required!'],
            trimmed: true
        },
        email: {
            type: String,
            required: true,
            unique: [true, 'Email is Required!'],
            // email validation, regex to match email
            match: [/.+@.+\..+/, 'Npt an Email address!']
        },
        thoughts: [
            {
                // is saving just the thought id 
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

userSchema.virtual ('friendCount').get(function() {
    // returns the number of friends in the friends array
    return this.friends.length;
});

// this is where the actual model is created
const User = model('User', userSchema);
// exports the user model only
module.exports = User;