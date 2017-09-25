/* 
 * Acá se maneja la coleccion de temas generales
 */


Temasgenerales = new Mongo.Collection('temasgenerales');


Temasgenerales.allow({
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId;
  }
});