const { Schema, model, Types } = require('mongoose');
// this imports the format function in the utils folder
const format = require('../utils/dateFormat')

const reactionSchema = new Schema({
    reactionId:{
     type: Schema.Types.ObjectId,
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
     type: String,
     required: true
    },
    createdAt: {
     type: Date,
     default: Date.now,
     get: time => format(time)
    }
 },
 {
     toJSON: {
         getters: true
     },
     id: false
 }
 
 );

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        // required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        // current date
        default: Date.now,
        // getter method to format date
        get: time => format(time),
    },
    username: {
        type: String,
        // required:[true,'Must include username']
    },
    // connects reaction schema as a sub document
    reactions: [reactionSchema],

},
// this is required to use getters as JSOn
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
);

thoughtSchema.virtual('reactionCount').get(function() {
    // returns the number of friends in the friends array
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);



module.exports = Thought;

