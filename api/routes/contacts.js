const express = require('express');
const router = express.Router();
const contacts = require('./contacts/index');

router.use('/',contacts.auth);

router.get('/',contacts.get);

router.get('/recents',contacts.getRecents);

router.post('/',contacts.add);

router.delete('/',contacts.remove);

router.patch('/',contacts.update);

module.exports = router;