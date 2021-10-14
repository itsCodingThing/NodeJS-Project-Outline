var mongoose = require("mongoose");
var mongoCon = require("../mongo.connection.js");
var Schema = mongoose.Schema;

var schemaName = new Schema(
  {
    _id: Object,
    name: String,
    email: String,
  },
  { versionKey: false }
);

schemaName.set("collection", "users");
var userModel = mongoCon.model("users", schemaName);
exports.userModel = questionModel;
