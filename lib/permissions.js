/* 
 * Al haber eliminado el paquete insecure, se nos deniegan todas las peticiones de modificación desde el cliente.
 * Para solucionarlo, estableceremos algunas reglas de permisos. Primero, creamos un nuevo archivo permissions.js
 */


// Compruebe que el ID de usuario especificado posee los documentos
ownsDocument = function(userId, doc) {
  return doc && doc.userId === userId;
}