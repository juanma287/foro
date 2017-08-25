/* 
 *Las colecciones son el eje central de nuestra app, así que para 
 *asegurarnos de que se definan primero, las ponemos en el directorio lib
*/


Comments = new Mongo.Collection('comments');


Meteor.methods({
  commentInsert: function(commentAttributes) {
    check(this.userId, String);
    check(commentAttributes, {
      postId: String,
      body: String
    });
    var user = Meteor.user();
    var post = Posts.findOne(commentAttributes.postId);
    if (!post)
      throw new Meteor.Error('invalid-comment', 'Debe comentar una publicación');
    comment = _.extend(commentAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date().toLocaleString()
    });
    
    // actualizamos el post con el número de comentarios
    // Usamos el operador $inc de Mongo (que incrementa campos numéricos)
   Posts.update(comment.postId, {$inc: {commentsCount: 1}});

    // creamos el comenterio y guardamos el id
    comment._id = Comments.insert(comment);
    //  creamos la notification
    createCommentNotification(comment);
    return comment._id;
  }
});