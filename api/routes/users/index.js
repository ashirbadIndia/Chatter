const getUsers = require('./getUsers');
const createUser = require('./createUser');
const deleteUser = require('./deleteUser');
const authenticateUser = require('./authenticateUser');
const editUser = require('./editUser');
const authToken = require('./middleware/token');
const checkToken = require('./authenticateToken');

module.exports = {
    get: getUsers,
    create: createUser,
    delete: deleteUser,
    auth: authenticateUser,
    edit: editUser,
    authToken,
    checkToken
}