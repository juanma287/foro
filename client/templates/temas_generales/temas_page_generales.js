// Devolvemos los temas con el ayuante post_temas
Template.temasPageGenerales.helpers({
  temas: function() {
    // pasamos el id del presente tema, para traer los posts asociados al mismo
    return Temas.find({temagenerId: this._id});
  }
});
