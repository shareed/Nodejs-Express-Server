const knex = require('knex');
const config = require('../knexfile.js');
const db = knex(config.development);

module.exports = {
  find,
  findBy,
  findById,
  add,
  remove,
  update,
  findHubMessages,
};

function find(query) {
//   const { page = 1, limit = 2, sortby = 'id', sortdir = 'asc' } = query;
//   const offset = limit * (page - 1);

  let rows = db('hubs')
    // .orderBy(sortby, sortdir)
    // .limit(limit)
    // .offset(offset);

  return rows;
}

function findBy(filter) {
  return db("hubs").where(filter);
}

function findById(id) {
  return db('hubs')
    .where({ id })
    .first();
}

async function add(hub) {
  const [id] = await db('hubs').insert(hub);

  return findById(id);
}

function remove(id) {
  return db('hubs')
    .where({ id })
    .del();
}

function update(id, changes) {
  return db('hubs')
    .where({ id })
    .update(changes, '*');
}

function findHubMessages(hubId) {
  return db('messages as m')
    .join('hubs as h', 'm.hub_id', 'h.id')
    .select('m.id', 'm.text', 'm.assignee', 'h.id as hubId', 'h.hubname as hub')
    .where({ hub_id: hubId });
}