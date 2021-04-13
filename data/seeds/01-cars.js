// STRETCH
const cars = [
    {
        vin: '1HGCE6658TA800307',
        make: 'Honda',
        model: 'Accord',
        mileage: '57156.73',
        title: 'clean',
        transmission: null,
    },
    {
        vin: '5N1MD28YX3C702496',
        make: 'Nissan',
        model: 'Xterra',
        mileage: '117437.21',
        title: null,
        transmission: 'automatic',
    },
    {
        vin: '4S3BD4352V6209983',
        make: 'Subaru',
        model: 'Legacy',
        mileage: '31468.04',
        title: null,
        transmission: null,
    },
    {
        vin: '4T4BE46K39R338297',
        make: 'Toyota',
        model: 'Camry',
        mileage: '75243.63',
        title: 'salvage',
        transmission: 'manual',
    },
    {
        vin: 'WVWFB4318ME013393',
        make: 'Volkswagen',
        model: 'Passat',
        mileage: '96542.76',
        title: 'clean',
        transmission: 'automatic',
    },
    {
        vin: '1FMYU92173KA15634',
        make: 'Ford',
        model: 'Escape',
        mileage: '124409.92',
        title: null,
        transmission: 'automatic',
    },
    {
        vin: '1JCMR7330J0019752',
        make: 'Jeep',
        model: 'Cherokee',
        mileage: '45458.18',
        title: 'clean',
        transmission: null,
    },
    {
        vin: 'KNDJA723XT5517217',
        make: 'Kia',
        model: 'Sportage',
        mileage: '89629.07',
        title: null,
        transmission: 'automatic',
    },
]


exports.seed = function(knex) {
    return knex('cars').truncate()
        .then(function() {
            return knex('cars').insert(cars)
        })
}