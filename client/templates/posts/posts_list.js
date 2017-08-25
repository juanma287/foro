/* 
 * Aca creamos la lógica de la plantilla ::post_list::
 * 
 *  usamos la función Template.postsList.helpers() para definir un ayudante de plantilla 
 */


// find() devuelve un cursor, meteor es lo suficientemente inteligente para saber cómo iterar sobre cursores 
// sin tener que convertirlos de forma explícita en arrays. Por eso no veremos a menudo fetch()
// seteamos el aydante ::posts:: para el template postsList, que luego usamos en post_list.html

/**
Template.postsList.helpers({
  posts: function() {
    // devolvemos un cusor al ayudante posts
      return Posts.find({}, {sort: {submitted: -1}}); // los devolvemos ordenados por fecha utilizando el atributo submitted
  }
});

*/


