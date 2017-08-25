/* 
 * Como estamos actualizando las notificaciones desde el lado del cliente,
 *  necesitamos asegurarnos que la llamada ::allow:: es a prueba de balas.
 *  Por lo que deberemos comprobar que:
     *  El usuario que hace la llamada update es el dueño de la notificación modificada.
     *  El usuario solo está intentando modificar un solo campo.
     *  El campo a modificar es la propiedad read de nuestra notificación.
 */


Notifications = new Mongo.Collection('notifications');

Notifications.allow({
  update: function(userId, doc, fieldNames) {
    return ownsDocument(userId, doc) &&
      fieldNames.length === 1 && fieldNames[0] === 'read';
  }
});


// Esta funcion insertará una notificación para cada comentario que se haga en un post
createCommentNotification = function(comment) {
  var post = Posts.findOne(comment.postId);
  if (comment.userId !== post.userId) {
    Notifications.insert({
      userId: post.userId,  // usuario a ser notificado
      postId: post._id,     
      commentId: comment._id,
      commenterName: comment.author, // usuario que comento
      read: false
    });
  }
};