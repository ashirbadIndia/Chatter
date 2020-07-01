const express = require('express');
const router = express.Router();

const chats = require('./conversation/index');


router.get('/:_id',chats.get);

router.post('/',chats.add);

router.delete('/',chats.delete);

module.exports = router;