var vogels = require("vogels");
var Joi = require("joi");
var uuid = require("node-uuid");
var fs = require("fs");
var Freshman;
// This should split env variables
vogels.AWS.config.loadFromPath("credentials.json");

var readFile = (fileName)=>{
  return new Promise((resolve,reject)=>{
    fs.readFile(fileName,"utf8",(err,res)=>{
      if(err){
        reject(err);
      }else{
        resolve(res);
      }
    });
  });
}

readFile("./secrets.json").then(r => {
  var conf = JSON.parse(r);
  vogels.AWS.config.update({
    endpoint: conf.endpoint,
    region: conf.region
  });
  Freshman = vogels.define("Freshman", {
    hashKey: "ID",
    schema: {
      ID: Joi.string(),
      mail: Joi.string(),
      params: Joi.object()
    }
  });

  vogels.createTables((error) => {
    if (error) {
      console.error("Initializing DynamoDB tables was failed".red,error);
    } else {
      console.info("DynamoDB tables was initialized without any error".green);
    }
  });
},(err)=>{
  console.error("Failed to load secrets.json".red,err);
});

module.exports = {
  mailRegister: (mail) => {
    return new Promise((resolve, reject) => {
      var id = uuid.v4();
      Freshman.create({
          ID: id,
          mail: mail
        },
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(id);
          }
        });
    });
  }
};
