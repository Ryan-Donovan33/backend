const db = require('../data/db-config')


module.exports = {
    addUser,
    findUserByUsername,
    getAllUsers,
    findById,
    findUsersPet
}

async function addUser(user) {
    const registered = await db('Users').first().insert(user, 'id')
    const createdUser = await findById(registered[0])
    return createdUser
}

async function findUserByUsername(username) {
    const user = await db('Users').where({ username }).select('id', 'username', 'password')
    return user[0]
}

async function getAllUsers() {
    const users = await db('Users')
    return users
}

async function findById(id) {
    const user = await db('Users').where({ id }).select('id', 'username', 'password', 'pet_id')
    return user[0]
}

async function findUsersPet(user_id) {
    const pet = await db('Users').where({ id: user_id }).first().select('pet_id')
    const usersPet = await db('Pets').where({ id: pet.pet_id }).first().select('*')
    return usersPet
}