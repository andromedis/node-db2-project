const Cars = require('./cars-model')
const vinValidator = require('vin-validator')

const checkCarId = async (req, res, next) => {
    // `checkCarId` returns a status 404 with a 
    // `{ message: "car with id <car id> is not found" }` if the id in 
    // `req.params` does not exist in the database.
    const { id } = req.params
    try {
        const car = await Cars.getById(id)
        if (car) {
            req.car = car
            next()
        }
        else {
            res.status(404).json({ message: `car with id ${id} is not found` })
        }
    }
    catch (err) {
        next(err)
    }

}

const checkCarPayload = (req, res, next) => {
    // `checkCarPayload` returns a status 400 with a 
    // `{ message: "<field name> is missing" }` if any required field is missing.
    const { vin, make, model, mileage } = req.body
    if (!vin) {
        res.status(400).json({ message: 'vin is missing' })
    }
    else if (!make) {
        res.status(400).json({ message: 'make is missing' })
    }
    else if (!model) {
        res.status(400).json({ message: 'model is missing' })
    }
    else if (!mileage) {
        res.status(400).json({ message: 'mileage is missing' })
    }
    else {
        next()
    }
}

const checkVinNumberValid = (req, res, next) => {
    // `checkVinNumberValid` returns a status 400 with a 
    // `{ message: "vin <vin number> is invalid" }` if the vin number is invalid
    const { vin } = req.body
    if (vinValidator.validate(vin)) {
        next()
    }
    else {
        res.status(400).json({ message: `vin ${vin} is invalid` })
    }
}

const checkVinNumberUnique = async (req, res, next) => {
    // `checkVinNumberUnique` returns a status 400 with a 
    // `{ message: "vin <vin number> already exists" }` if the vin number 
    // already exists in the database.
    const { vin } = req.body
    const { id } = req.params
    try {
        const cars = await Cars.getAll()
        const matches = cars.filter(car => {
            return car.vin === vin && car.id != id // Needs to be car.id != id for some reason
        }).length
        if (matches) {
            res.status(400).json({ message: `vin ${vin} already exists` })
        }
        else {
            next()
        }
    }
    catch (err) {
        next(err)
    }
}

module.exports = {
    checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique
}