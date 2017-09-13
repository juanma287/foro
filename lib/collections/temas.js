/* 
 * Acá se maneja la coleccion de temas
 */


Temas = new Mongo.Collection('temas');


Temas.allow({
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId;
  }
});