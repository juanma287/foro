/* 
Para decirle a nuestro sistema de cuentas que queremos que los usuarios accedan al sistema a
través de solo un nombre de usuario, simplemente añadimos el siguiente codigo
 */

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});