import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

// Nos suscribimos a la publicación creada en el servidor y elijo los titulos que quiero
// Esta es la forma de hacer escalable una aplicación Meteor: en lugar de suscribirse a todos los datos disponibles, 
// solo escogemos las piezas que necesitamos en un momento dado.De esta manera, evitaremos sobrecargar la memoria del navegador, 
// sin importar si el tamaño de la base de datos del servidor es enorme.

/*
Meteor.subscribe('posts','Juanma');
Meteor.subscribe('posts','Meteor');
Meteor.subscribe('posts','La momia no duerme');

*/