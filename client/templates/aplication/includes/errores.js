/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Template.errores.helpers({
  errores: function() {
    return Errores.find();
  }
});

Template.errores.onRendered(function() {
  var error = this.data;
  Meteor.setTimeout(function () {
    Errores.remove(error._id);
  }, 4000);
});