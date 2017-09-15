/* 
 * Vamos a enlazar un controlador de eventos al evento submit del formulario.
 * Es mejor usar el evento submit (en lugar de un click en un botón), 
 * ya que cubrirá todas las posibles formas de envío (como por ejemplo pulsar intro)
 */


Template.postSubmit.events({
  'submit form': function(e) {
      
   // Tenemos que asegurarnos de usar preventDefault para que el navegador
   // no intente enviar el formulario si después volvemos atrás o adelante   
    e.preventDefault();

    var post = {
      descripcion: $(e.target).find('[name=descripcion]').val(),
      title: $(e.target).find('[name=title]').val(),
      temaId: $(e.target).find('[name=temas]').val()
    };
    
    // Validamos un pocoo 
    var errors = validarPost(post);
    if (errors.title || errors.descripcion)
      return Session.set('postSubmitErrors', errors);
    
    // llamamos al metodo postInsert, pasamos el objeto post y habilitamos un callback, (que se ejecutará cuando el método del lado del servidor finalice)
    Meteor.call('postInsert', post, function(error, result) {
     // Las funciones de retorno (callback) de los métodos Meteor siempre tienen dos argumentos (error, result)
     if (error)
        return throwError(error.reason);

     // Si el post ya existe avisamos y mostramos la ruta
     if (result.postExists)
        throwError('Ya ha sido publicado un post con dicho título');
    
      // Si todo ha funcionado bien, redirigiremos al usuario a la página de discusión del post recién creado.
      Router.go('postPage', {_id: result._id});  
    });
 }
});

// En versiones superiores agregar :: Meteor add session :: (ya que sesion no viene de forma predeterminada)
Template.postSubmit.onCreated(function() {
  Session.set('postSubmitErrors', {});
});


//  Definimos dos ayudantes de plantilla. Ambos buscarán la propiedad field del objeto Session.get('postSubmitErrors')
// (donde field será descripcion o title dependiendo del ayudante desde que el que se llame)
Template.postSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('postSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
  },
  temas: function()
    {    
     return Temas.find();
    }
});
