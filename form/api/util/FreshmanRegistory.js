  var vogels = require("vogels");
  var Joi = require("joi");
  vogels.AWS.config.loadFromPath("credentials.json");
  vogels.AWS.config.update({
    endpoint: "http://localhost:8181",
    region:"local"
  });
  var FreshmanRegistory = {
    init: () => {
      return new Promise((resolve, reject) => {
        vogels.define("Member", {
          hashKey: "StudentID",
          schema: {
            StudentID:Joi.string()
          }
        })
        vogels.createTables((err)=>{
          if(err){
            reject(err);
          }else{
            resolve();
          }
        })
      });
    }
  };


  module.exports = FreshmanRegistory;
