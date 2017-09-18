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


   var temaSaxo = Temas.insert({
      title: 'SAXOFONIA',
      url: 'http://google.com/?q=test-',
      postCount: 2
    });
    
   var temaOrgano = Temas.insert({
      title: 'ORGANO',
      url: 'http://google.com/?q=test-',
      postCount: 0
    });
    
    
    var temaGuitarra = Temas.insert({
      title: 'GUITARRA ELECTRICA',
      url: 'http://google.com/?q=test-',
      postCount: 10
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