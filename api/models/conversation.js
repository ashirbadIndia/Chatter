const mongoose = require('mongoose');

const convSchema = mongoose.Schema({
    author: String,
    text: String,
    date: { type: Date, default: Date.now }
})

const conversations = mongoose.Schema({
    userOne: {type: mongoose.Types.ObjectId, ref:'User'},
    userTwo: {type: mongoose.Types.ObjectId, ref:'User'},
    chatId: {type:String, unique:true},
    messages: [convSchema]
})

module.exports = mongoose.model("Chats",conversations);