/**
 * RegisterController
 *
 * @description :: Server-side logic for managing registers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Tables = require("../models/Tables");

module.exports = {
  index: (req, res) => {
		Tables.mailRegister("LimeStreem@gmail.com").then((r)=>{
			console.log(r);
		},(err)=>{
			console.error(err);
		})
  }
};
