var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var NoteSchema = new Schema({
  textTitle: { type: String },
  date: { type: Date, default: new Date() },
  text: { type: String },
  tags: { type: [String] },
  writer: { type: Schema.Types.ObjectId, ref: "User", required: false },
});

module.exports = mongoose.model("Note", NoteSchema);
