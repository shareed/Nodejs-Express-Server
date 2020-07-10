
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('hubs').truncate()// truncate will reset our ids
    .then(function () {
      // Inserts seed entries
      return knex('hubs').insert([
        {id: 1, hubname: 'Party Hub', email: 'hub1@email.com', password: 'hub1'},
        {id: 2, hubname: 'Boring Hub', email: 'hub2@email.com', password: 'hub2'},
        {id: 3, hubname: 'Coding Hub', email: 'hub3@email.com', password: 'hub3'},
        {id: 4, hubname: 'Learning Hub', email: 'hub4@email.com', password: 'hub4'},
        {id: 5, hubname: 'Sleeping Hub', email: 'hub5@email.com', password: 'hub5'},
        {id: 6, hubname: 'Eating Hub', email: 'hub6@email.com', password: 'hub6'}
      ]);
    });
};
