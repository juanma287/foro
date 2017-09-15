/* 
 * Aca creamos la lógica de la plantilla ::post_item::
 */


// El valor de nuestro ayudante domain es una función anónima
Template.postItem.helpers({
    
  // No queremos que se muestre el enlace para editar un post
  // que no haya sido creado por ese usuario. Aquí es donde entra el ayudante creoElPost 
  creoElPost: function() {
    return this.userId === Meteor.userId();
  },
  upvotedClass: function() {
    var userId = Meteor.userId();
    if (userId && !_.include(this.upvoters, userId)) {
      return 'btn-primary upvotable';
    } else {
      return 'disabled';
    }
  }
});

// llamamos a este metodo cuando el usaurio haga clic en el like
Template.postItem.events({
   'click .upvotable': function(e) {
    e.preventDefault();
    Meteor.call('upvote', this._id);
  }
});