import Knex from 'knex' // Knex com K se refere ao tipo enquanto que knex se refere a variavel

export async function up(knex: Knex) {
    return knex.schema.createTable('point_items', table => {
        table.increments('id').primary();
        table.integer('point_id').notNullable().references('id').inTable('points');
        table.integer('item_id').notNullable().references('id').inTable('items');
        
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('point_items')
}