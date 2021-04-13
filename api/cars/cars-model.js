const db = require('../../data/db-config')

const getAll = () => {
    return db('cars')
}

const getById = (id) => {
    return db('cars').where({ id }).first()
}

const create = async (car) => {
    const [ id ] = await db('cars').insert(car)
    return getById(id)
}

const update = async (id, car) => {
    await db('cars').where({ id }).update(car)
    return getById(id)
}

const remove = async (id) => {
    const deletedCar = await getById(id)
    await db('cars').where({ id }).delete()
    return deletedCar
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}