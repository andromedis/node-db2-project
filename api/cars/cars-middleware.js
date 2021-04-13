const Cars = require('./cars-model')
const vinValidator = require('vin-validator')

const checkCarId = async (req, res, next) => {
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
    const required = ['vin', 'make', 'model', 'mileage']

    // Removes any id property from payload
    if (req.body.id) {
        const { id, ...rest } = req.body
        req.body = rest
    }

    // Checks that required properties exist
    required.forEach(item => {
        if (!req.body[item])
            res.status(400).json({ message: `${item} is missing` })
    })

    // Checks that required properties have proper types, trims strings
    required.forEach(item => {
        switch (item) {
            case 'mileage':
                if (typeof req.body[item] !== 'number')
                    res.status(400).json({ message: `${item} must be a number` })
                break;
            default:
                if (typeof req.body[item] !== 'string')
                    res.status(400).json({ message: `${item} must be a string` })
                else
                    req.body[item] = req.body[item].trim()
        }
    })

    // Checks that optional properties are strings, trims them
    Object.keys(req.body)
        .filter(item => !required.includes(item))
        .forEach(item => {
            if (req.body[item] && typeof req.body[item] !== 'string')
                res.status(400).json({ message: `${item} must be a string` })
            else
                req.body[item] = req.body[item].trim()
    })

    // Sends to next
    if (!res.headersSent) {
        next()
    }
}

const checkVinNumberValid = (req, res, next) => {
    const { vin } = req.body
    if (vinValidator.validate(vin)) {
        next()
    }
    else {
        res.status(400).json({ message: `vin ${vin} is invalid` })
    }
}

const checkVinNumberUnique = async (req, res, next) => {
    const { vin } = req.body
    const { id } = req.params
    try {
        const cars = await Cars.getAll()
        const matches = cars.filter(car => {
            return car.vin === vin && car.id != id 
            // Needs to be car.id != id for some reason -- !== won't work
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