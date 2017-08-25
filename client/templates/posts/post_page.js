

// Devolvemos los comentarios con el ayuante comments
Template.postPage.helpers({
  comments: function() {
    // pasamos el id del presente post, para traer los comentarios asociados al mismo
    return Comments.find({postId: this._id});
  }
});
