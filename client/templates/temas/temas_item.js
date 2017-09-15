/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Template.temasItem.helpers({
    temasCount: function() 
    {   
        return Posts.find({temaId: this._id}).count();  
    }});