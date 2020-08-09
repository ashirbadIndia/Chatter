const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    chatId: String,
    userId: {type: mongoose.Types.ObjectId, ref: 'Users'},
    favourite: {type: Boolean, default: false}
})
const recentSchema = mongoose.Schema({
    chatId: String,
    userId: {type: mongoose.Types.ObjectId, ref: 'Users'},
    lastMessage: String,
    lastMessageTime: { type: Date, default: Date.now }
})

const userSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type:String, default:''},
    emailId: {type: String, required: true, unique:true },
    password: {type: String, required: true},
    bio: {type:String, default:''}, 
    contacts: [contactSchema],
    recents: [recentSchema]
});



module.exports = mongoose.model('Users',userSchema);