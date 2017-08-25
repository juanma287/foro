

// El nombre de la coeccion es null ya que nunca lo vamos a almecenar en la BD
Errores  = new Mongo.Collection(null);


// creanos una funcion para añadir errores
throwError = function(message) {
  Errores.insert({message: message});
};