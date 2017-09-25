/* 
Hemos hecho dos cosas importantes. En primer lugar, le hemos dicho al router que utilice el layout 
que hemos creado como diseño predeterminado para todas las rutas.
En segundo lugar, hemos definido una nueva ruta llamada postsList y la hemos mapeado a /.
 */



// Le decimos al router que utilice (aputne al) el template layout como diseño predeterminado para todas las rutas
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  
  //Lo que estamos diciendo aquí es que para cualquier ruta del sitio
  // queremos suscribirnos a la subscripción posts 
  waitOn: function() {
    return [Meteor.subscribe('notifications')]
  }
});


Router.route('/posts/:_id', {
 name: 'postPage',
  waitOn: function() {
    return [
      Meteor.subscribe('singlePost', this.params._id),
      Meteor.subscribe('comments', this.params._id)
    ];
  },
  data: function() { return Posts.findOne(this.params._id); }  //datos con los que rellenamos la plantilla
});


Router.route('/posts/:_id/edit', {
  name: 'postEdit',
  waitOn: function() {
    return Meteor.subscribe('singlePost', this.params._id);
  },
  data: function() { return Posts.findOne(this.params._id); } //datos con los que rellenamos la plantilla
});

Router.route('/submit', {name: 'postSubmit'});


// inicio
Router.route('/', {name: 'listaTemasGeneales'});

Router.route('/listaTemasGeneales/:_id', {
  name: 'temasPageGenerales',
  waitOn: function() {
    return [
      Meteor.subscribe('temasgenerales'),
      Meteor.subscribe('temas')
    ];
  },
  data: function() { return Temasgenerales.findOne(this.params._id); }
});


//Router.route('/', {name: 'listaTemas'});

Router.route('/listaTemas/:_id', {
  name: 'temasPage',
  waitOn: function() {
    return [
      Meteor.subscribe('temas'),
      Meteor.subscribe('posts_temas')
    ];
  },
  data: function() { return Temas.findOne(this.params._id); }
});







var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      // mostraremos una pantalla de espera durante un instante en el que esperamos para ver si el usuario tiene acceso o no  
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}


PostsListController = RouteController.extend({
  template: 'postsList',
  increment: 5,
  postsLimit: function() { // devuelve el limite actual
    return parseInt(this.params.postsLimit) || this.increment;
  },
  findOptions: function() {
    return {sort: this.sort, limit: this.postsLimit()};
  },
  subscriptions: function() {
    this.postsSub = Meteor.subscribe('posts', this.findOptions());
  },
  posts: function() {
    return Posts.find({}, this.findOptions());
  },
  data: function() {
    var hasMore = this.posts().count() === this.postsLimit();
    var nextPath = this.route.path({postsLimit: this.postsLimit() + this.increment});
    return {
      posts: this.posts(),
      ready: this.postsSub.ready,
      nextPath: hasMore ? this.nextPath() : null
    };
  }
});

NewPostsController = PostsListController.extend({
  sort: {submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.newPosts.path({postsLimit: this.postsLimit() + this.increment})
  }
});
BestPostsController = PostsListController.extend({
  sort: {votes: -1, submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.bestPosts.path({postsLimit: this.postsLimit() + this.increment})
  }
});

/* Esto lo usaba cuando por defecto mostraba los nuevos posts 
Router.route('/', {
  name: 'home',
  controller: NewPostsController
});
*/

Router.route('/new/:postsLimit?', {name: 'newPosts'});
Router.route('/best/:postsLimit?', {name: 'bestPosts'});



// hook para los casos en que se cambie el id de la ruta manualmente
// Esto le dice a Iron Router que muestre la página de no encontrado, no solo cuando la ruta sea inválida, 
// si no también para la ruta postPagecuando la función data devuelva un objeto falso (o null, false, undefined o vació).
Router.onBeforeAction('dataNotFound', {only: 'postPage'});
// si el usuario no esta conectado mostramso la plantilla accessDenied
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});