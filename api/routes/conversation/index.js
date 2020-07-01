const getChat = require('./getChat');
const addChat = require('./addChat');
const deleteChat = require('./deleteChat');


module.exports = {
    get: getChat,
    add: addChat,
    delete: deleteChat
}