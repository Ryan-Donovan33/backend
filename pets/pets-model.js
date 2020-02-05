const db = require('../data/db-config')

module.exports = {
    createPet,
    findPet
}

async function createPet(req, res, pet_data) {
    try {
        const pet = await db('Pets').insert(pet_data)
        const newPet = await findPet(pet[0])
        const pet_id = newPet.id
        await db('Users').where({id: req.params.id}).update({pet_id: pet_id})
        return newPet
    }
    catch(err) {
        res.status(500).json(err)
    }
}

async function findPet(id) {
    const pet = await db('Pets').first().where({ id }).select('id', 'name', 'health')
    return pet
}