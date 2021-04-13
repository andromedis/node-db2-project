const db = require('../../data/db-config')

const getAll = () => {
    // `getAll` resolves to an array of car records (or an empty array)
    return db('cars')
}

const getById = (id) => {
    // `getById` resolves to a car record by the given id
    return db('cars').where({ id }).first()
}

const create = async (car) => {
    // `create` resolves to the newly created car record
    const [ id ] = await db('cars').insert(car)
    return getById(id)
}

module.exports = {
    getAll,
    getById,
    create
}