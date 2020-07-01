const express = require('express');
const router = express.Router();
const contacts = require('./contacts/index');

router.get('/:id',contacts.get);

router.post('/',contacts.add);

router.delete('/',contacts.remove);

router.patch('/',contacts.update);

module.exports = router;