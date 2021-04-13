exports.up = function(knex) {
    return knex.schema.createTable('cars', table => {
        table.increments()
        table.text('vin', 128).unique().notNullable()
        table.text('make', 128).notNullable()
        table.text('model', 128).notNullable()
        table.decimal('mileage').notNullable()
        table.text('title')
        table.text('transmission')
    })
}

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars')
}