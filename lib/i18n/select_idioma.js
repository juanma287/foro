getUserLanguage = function () {
  // Put here the logic for determining the user language

   var userLang = 'es';
   if (Meteor.user() && Meteor.user().profile.language) {
    userLang = Meteor.user().profile.language;
 
  } 
  else 
  {   
    // miramos el lenguaje del navegador  
    userLang = navigator.language || navigator.userLanguage;

    if (!userLang) {
      userLang = 'es';
      
    }
    if (userLang && userLang.length > 2) {
      userLang = userLang.substring(0, 2);

    }
  return userLang;
}};

if (Meteor.isClient) {
  Meteor.startup(function () {
    Session.set("showLoadingIndicator", true);

    TAPi18n.setLanguage(getUserLanguage())
      .done(function () {
        Session.set("showLoadingIndicator", false);
      })
      .fail(function (error_message) {
        // Handle the situation
        console.log(error_message);
      });
  });
}