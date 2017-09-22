if (Posts.find().count() === 0) {
  var now = new Date().getTime();

  // create two users
  var tomId = Meteor.users.insert({
    profile: { name: 'Tom Coleman' }
  });
  var tom = Meteor.users.findOne(tomId);
  var sachaId = Meteor.users.insert({
    profile: { name: 'Sacha Greif' }
  });
  var sacha = Meteor.users.findOne(sachaId);

  
   // temas generales
     var temaSaxoGeneal = Temasgenerales.insert({
      title: 'SAXOFONIA',
      temasCount: 2
    });
    
    var temaoRganoGeneal = Temasgenerales.insert({
      title: 'ORGANO',
      temasCount: 1
    });
    
     var temaGuitarraGeneal = Temasgenerales.insert({
      title: 'GUITARRA',
      temasCount: 2
    });
    
    var temaAcordeonGeneral = Temasgenerales.insert({
      title: 'ACORDEON',
      temasCount: 0
    });
  
    var temaOtrosGeneral = Temasgenerales.insert({
      title: 'OTRO',
      temasCount: 1
    });



   // temas
    var temaOtro = Temas.insert({
      temagenerId: temaOtrosGeneral,
      title: 'OTRO',
      postCount: O
    });
    
   
   var temaSaxo = Temas.insert({
      temagenerId: temaSaxoGeneal,
      title: 'SAXO PARA PRINCIPIANTES',
      postCount: 3
    });
    
   var temaSaxoAvanzado = Temas.insert({
      temagenerId: temaSaxoGeneal,
      title: 'SAXO PARA AVANZADOS',
      postCount: 0
    });
    
   var temaOrgano = Temas.insert({
      temagenerId: temaoRganoGeneal,
      title: 'ORGANO',
      postCount: 0
    });
    
    
    var temaGuitarra = Temas.insert({
      temagenerId: temaGuitarraGeneal,
      title: 'GUITARRA ELECTRICA',
      postCount: 10
    });
  
      var temaGuitarraCriolla = Temas.insert({
      temagenerId: temaGuitarraGeneal,
      title: 'GUITARRA CRIOLLA',
      postCount: 0
    });
  

  var telescopeId = Posts.insert({
    title: 'Introducing Telescope',
    temaId: temaSaxo,
    userId: sacha._id,
    author: sacha.profile.name,
    descripcion: 'http://sachagreif.com/introducing-telescope/',
    submitted: new Date(now - 7 * 3600 * 1000),
    commentsCount: 2,
    upvoters: [],
    votes: 0
  });

  Comments.insert({
    postId: telescopeId,
    userId: tom._id,
    author: tom.profile.name,
    submitted: new Date(now - 5 * 3600 * 1000),
    body: 'Interesting project Sacha, can I get involved?'
  });

  Comments.insert({
    postId: telescopeId,
    userId: sacha._id,
    author: sacha.profile.name,
    submitted: new Date(now - 3 * 3600 * 1000),
    body: 'You sure can Tom!'
  });

  Posts.insert({
    title: 'Meteor',
    temaId: temaSaxo,
    userId: tom._id,
    author: tom.profile.name,
    descripcion: 'http://meteor.com',
    submitted: new Date(now - 10 * 3600 * 1000),
    commentsCount: 0,
    upvoters: [],
    votes: 0
  });

  Posts.insert({
    title: 'The Meteor Book',
    temaId: temaSaxo,
    userId: tom._id,
    author: tom.profile.name,
    descripcion: 'http://themeteorbook.com',
    submitted: new Date(now - 12 * 3600 * 1000),
    commentsCount: 0,
    upvoters: [],
    votes: 0
  });

  for (var i = 0; i < 10; i++) {
    Posts.insert({
      title: 'Test post #' + i,
      temaId: temaGuitarra,
      author: sacha.profile.name,
      userId: sacha._id,
      descripcion: 'http://google.com/?q=test-' + i,
      submitted: new Date(now - i * 3600 * 1000 + 1),
      commentsCount: 0,
      upvoters: [],
      votes: 0
    });
  }
  
   

}