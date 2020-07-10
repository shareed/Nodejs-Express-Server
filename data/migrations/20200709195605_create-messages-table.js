
exports.up = function(knex) {
    return knex.schema
    .createTable('messages', tbl => {
        tbl.increments();
        tbl
          .string('assignee')
          .notNullable()
          .index();
        tbl.text('text').notNullable();
        tbl.timestamps(true, true);
  
        tbl
          .integer('hub_id')
          .unsigned()
          .references('id')
          .inTable('hubs')
          .onDelete('CASCADE')
          .onUpdate('CASCADE');
      });
  
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('messages');
};
