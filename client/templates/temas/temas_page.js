// Devolvemos los post con el ayuante post_temas
Template.temasPage.helpers({
  posts: function() {
    // pasamos el id del presente tema, para traer los posts asociados al mismo
    return Posts.find({temaId: this._id});
  }
});
