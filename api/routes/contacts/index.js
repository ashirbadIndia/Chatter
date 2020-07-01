const addToContact = require('./addToContact');
const removeFromContacts = require('./removeFromContacts');
const getContacts = require('./getContacts');
const updateContact = require('./updateContact');

module.exports = {
    add: addToContact,
    remove: removeFromContacts,
    get: getContacts,
    update: updateContact
}