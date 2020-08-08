const addToContact = require('./addToContact');
const removeFromContacts = require('./removeFromContacts');
const getContacts = require('./getContacts');
const updateContact = require('./updateContact');
const authenticate = require('./middleware/token');
const getRecents = require('./getRecentList');

module.exports = {
    add: addToContact,
    remove: removeFromContacts,
    get: getContacts,
    update: updateContact,
    auth: authenticate,
    getRecents
}