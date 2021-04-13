// Imports
const router = require('express').Router()
const Cars = require('./cars-model')
const mw = require('./cars-middleware')


// `[GET] /api/cars` returns an array of cars sorted by id (or an empty array if there aren't any).
router.get('/', async (req, res, next) => {
    try {
        const cars = await Cars.getAll()
        res.status(200).json(cars)
    } 
    catch (err) {
        next(err)
    }
})

// `[GET] /api/cars/:id` returns a car by the given id.
router.get('/:id', mw.checkCarId, async (req, res, next) => {
    res.status(200).json(req.car)
})

// `[POST] /api/cars` returns the created car.
router.post('/', 
    mw.checkCarPayload, 
    mw.checkVinNumberValid, 
    mw.checkVinNumberUnique, async (req, res, next) => {
        try {
            const newCar = await Cars.create(req.body)
            res.status(201).json(newCar)
        }
        catch (err) {
            next(err)
        }
})

// [PUT]
router.put('/:id', 
    mw.checkCarId, 
    mw.checkCarPayload, 
    mw.checkVinNumberValid, 
    mw.checkVinNumberUnique, async (req, res, next) => {
        try {
            const updatedCar = await Cars.update(req.params.id, req.body)
            res.status(200).json(updatedCar)
        }
        catch (err) {
            next(err)
        }
})

// [DELETE]
router.delete('/:id', mw.checkCarId, async (req, res, next) => {
    try {
        const deletedCar = await Cars.remove(req.params.id)
        res.status(200).json(deletedCar)
    }
    catch (err) {
        next(err)
    }
})

// Handle error response
router.use((err, req, res, next) => {
    res.status(500).json({ message: err.message, stack: err.stack })
})


// Exports
module.exports = router