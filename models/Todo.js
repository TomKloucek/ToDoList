const mongoose = require('mongoose')

const TodoSchema = mongoose.Schema({
    id : {type: Date , required : true},
    text : {type : String, required : true}
});

module.exports = mongoose.model("Todos", TodoSchema);