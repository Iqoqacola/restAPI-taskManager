const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    'subject': {
        type: String,
        required: true
    },
    'desc': {
        type: String,
        required: true
    },
    'group': {
        type: String,
        required: true,
    },
    'due': {
        type: String,
        required: true
    },
    'user_id': {
        type: String,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model("Tasks", taskSchema);