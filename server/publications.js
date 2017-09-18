/* 
Meteor tiene habilitado por defecto el paquete autopublish, algo que no es conveniente para aplicaciones en producción.
Este paquete indica que las colecciones son compartidas en su totalidad con cada cliente conectado.
Esto no es lo que realmente queremos, así que vamos a deshabilitarlo.

Con el tiempo vamos a necesitar asegurarnos de que solo trasferimos los posts que el usuario realmente necesita ver 
(teniendo en cuenta cosas como la paginación). Pero, por ahora, lo vamos a configurar 
para que la colección Posts se publique en su totalidad (tal y como lo teníamos hasta ahora).
Para ello, creamos una función publish() que devuelve un cursor que referencia a todos los posts:
 */

/* Limite la publicacion por titulos, en el clien tiene que
Meteor.publish('posts', function(title) {
  return Posts.find({title: title});
});
*/


// Limite la publicacion por titulos, en el clien tiene que
Meteor.publish('posts', function(options) {
  check(options, {
    sort: Object,
    limit: Number
  });
  return Posts.find({}, options);
});

Meteor.publish('singlePost', function(id) {
  check(id, String)
  return Posts.find(id);
});


// publicamos la coleccion de post para un tema en particular
Meteor.publish('posts_temas', function() {
  return Posts.find();
});


// publicamos la coleccion de temas
Meteor.publish('temas', function() {
  return Temas.find();
});

// probe con esto pero no andubo
/**
Meteor.publish('temas', function(id) {
  return Temas.find(id);
});
*/



// publicamos la coleccion
Meteor.publish('comments', function(postId) {
  check(postId, String);
  return Comments.find({postId: postId});
});


Meteor.publish('notifications', function() {
   return Notifications.find({userId: this.userId, read: false});
});