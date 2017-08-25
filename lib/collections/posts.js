/* 
característica central de Meteor: la sincronización automática de datos entre cliente y servidor.
la tecnología que lo hace posible, las COLECCIONESS
     (estructura de datos especial que se encarga de almacenar  
     los datos de forma permanente, en una base de datos MongoDB 
     en el servidor, y de la sincronización de datos en tiempo real 
     con el navegador de cada usuario conectado)

Las colecciones son el eje central de cualquier aplicación, así que para 
asegurarnos de que se definan primero, las pondremos en el directorio lib

En Meteor, la palabra clave var limita el alcance del objeto al archivo actual.
Nosotros queremos que los Posts estén disponibles para toda nuestra aplicación, por eso no usamos var.

El código dentro de las carpetas que no sean client/ ni server/ se ejecutará en ambos contextos.
 */


// Con este comando creamos una caché local dentro del navegador, de la colección real de Mongo
// Osea queremos decir que contiene un subconjunto de los datos, y ofrece un acceso muy rápido.
Posts = new Mongo.Collection('posts');


// Extenderemos el objeto postAttributes con tres propiedades más: el identificador del usuario _id y el username,
// además de la fecha y hora, antes de insertarlos en nuestra base de datos y devolver el _id al cliente
Meteor.methods({
  postInsert: function(postAttributes) {
    check(this.userId, String);
    // comprobamos que postAttributes pasado como argumento las cadenas title y url, para no terminar insertando cualquier dato extraño en nuestra base de datos
    check(postAttributes, {
      title: String,
      url: String
    });
    
    
    // Tambien validamos el post en el servidor, ya que por consola podrian meternos cuaquier cosa
    var errors = validarPost(postAttributes);
    if (errors.title || errors.url)
      throw new Meteor.Error('post-invalido', "Debe establecer un título y una URL para su publicación");



    //  Si ya tenemos un post con la misma URL, no vamos a permitir que se añada una segunda vez, 
    //  por el contrario, redirijamos al usuario al post ya existente
    var postWithSameLink = Posts.findOne({url: postAttributes.url});
    if (postWithSameLink) {
      return { //  lanzando una llamada return, el método se detiene en este punto sin llegar a ejecutar la sentencia insert
        postExists: true,  // devolvemos una marca para informar al cliente sobre la situacion
        _id: postWithSameLink._id
      }
    }

    var user = Meteor.user();
    // Extenderemos el objeto postAttributes (post creado) con tres propiedades más, id de usaurio, nombre y fecha
    // el método _.extend() nos permite “extender” un objeto con propiedades de otro
    var post = _.extend(postAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date(),
      commentsCount: 0,
      upvoters: [],
      votes: 0
    });

    var postId = Posts.insert(post);

    return {
      _id: postId
    };
  },

 upvote: function(postId) {
    check(this.userId, String);
    check(postId, String);
     var affected = Posts.update({
     _id: postId,
     upvoters: {$ne: this.userId}
    }, 
    {
      $addToSet: {upvoters: this.userId},
      $inc: {votes: 1}
    });
    if (! affected)
      throw new Meteor.Error('invalido', "Ya votaste este post");
  }
});



// como estamos editando y borrando posts desde el cliente, vamos a necesitar usar allow 
Posts.allow({
  update: function(userId, post) { return ownsDocument(userId, post); },
  remove: function(userId, post) { return ownsDocument(userId, post); },
});


// No se debe poder editar todas las propiedades del post. 
// Por ejemplo, no queremos que los usuarios puedan crear un post y luego asignárselo a otro usuario.
// Utilizaremos el callback deny() para asegurarnos de que los usuarios solo puedan editar los atributos especificados
Posts.deny({
  update: function(userId, post, fieldNames) {
    //Sólo puede editar los dos campos siguientes
    return (_.without(fieldNames, 'url', 'title').length > 0);
  }
});

// como no usamos un metodo para editar lo post, sino una llamada directa a update, debemos validar usando deny
Posts.deny({
  update: function(userId, post, fieldNames, modifier) {
    var errors = validarPost(modifier.$set);
    return errors.title || errors.url;
  }
});


// Validamos los post
validarPost = function (post) {
  var errors = {};
  if (!post.title)
    errors.title = "Por favor, ingrese un titulo";
  if (!post.url)
    errors.url =  "Por favor, ingrese una URL";
  return errors;
}