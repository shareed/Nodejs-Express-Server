const knex = require('knex');
const config = require('../knexfile.js');
const db = knex(config.development);

module.exports = {
    
  findMessageById,
  addMessage,
  //   removeMessage,
  //   updateMessage,
};




  
  // You Do
  function findMessageById(id) {
    return db('messages')
      .where({ id })
      .first();
  }
  
  async function addMessage(message) {
    const [id] = await db('messages').insert(message);
  
    return findMessageById(id);
  }
  
  // function removeMessage(id) {
  //   return null;
  // }
  
  // function updateMessage(id, changes) {
  //   return null;
  // }