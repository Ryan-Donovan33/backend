
exports.up = function(knex) {
    return knex.schema.createTable('Foods_Eaten', (table) => {
        table.increments('id')
            .notNullable()
        table.integer('pet_id')
            .notNullable()
            .references('id')
            .inTable('Pets')
        table.integer('food_id')
            .notNullable()
            .references('id')
            .inTable('Foods')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        table.timestamp('created_at')
            .defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Foods_Eaten')
};
