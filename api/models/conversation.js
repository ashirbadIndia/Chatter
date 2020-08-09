const mongoose = require('mongoose');

const convSchema = mongoose.Schema({
    author: String,
    message: String,
    date: { type: Date, default: Date.now }
})

const conversations = mongoose.Schema({
    userOne: {type: mongoose.Types.ObjectId, ref:'Users'},
    userTwo: {type: mongoose.Types.ObjectId, ref:'Users'},
    colorOne: {type: String, default: 'default'},
    colorTwo: {type: String, default: 'default'},
    chatId: {type:String, unique:true},
    messages: [convSchema]
})

module.exports = mongoose.model("Chats",conversations);