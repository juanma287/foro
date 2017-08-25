
// En versiones superiores agregar :: Meteor add session :: (ya que sesion no viene de forma predeterminada)
Template.postEdit.onCreated(function() {
  Session.set('postEditErrors', {});
});

//  Definimos dos ayudantes de plantilla. Ambos buscarán la propiedad field del objeto Session.get('postSubmitErrors')
// (donde field será url o title dependiendo del ayudante desde que el que se llame)
Template.postEdit.helpers({
  errorMessage: function(field) {
    return Session.get('postEditErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('postEditErrors')[field] ? 'has-error' : '';
  }
});



// tenemos dos eventos (uno para borrar y otro para guardar los cambios)
Template.postEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentPostId = this._id;

    // Obtenemos los nuevos valores del formulario 
    var postProperties = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    }


    var errors = validarPost(postProperties);
    if (errors.title || errors.url)
      return Session.set('postEditErrors', errors);
  
  
    // usamos el operador $setm, que reemplaza un conjunto de atributos (aquellos que actualizamos) dejando los demás intactos 
    Posts.update(currentPostId, {$set: postProperties}, function(error) {
      if (error) {
        throwError(error.reason);
      } else {
        Router.go('postPage', {_id: currentPostId}); // enviamos al usuario a la pagina del post
      }
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Desea borrar el post?")) {
      var currentPostId = this._id; // obtenemos el ID del post actual desde el contexto de datos de la plantilla
      Posts.remove(currentPostId);
      Router.go('home'); // luego de borraar el post redirigimos el usuario a la pagina de inicio
    }
  }
});