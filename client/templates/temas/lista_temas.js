/* 

Template.temas.helpers({ 
    temas: function()
    {    
        Temas.find();
    }
});
 */



var listaTemas = [
  {
    title: 'Introducing Telescope',
    url: 'http://sachagreif.com/introducing-telescope/'
  },
  {
    title: 'Meteor',
    url: 'http://meteor.com'
  },
  {
    title: 'The Meteor Book',
    url: 'http://themeteorbook.com'
  }
];
Template.listaTemas.helpers({
  temas: listaTemas
});
