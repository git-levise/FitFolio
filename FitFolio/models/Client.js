const mongoose = require("mongoose");

const clientSchema = mongoose.Schema({
    name: {
       type: String,
       required: [true, "Please add the name"]
    },
    weight: {
       type: Number, 
       required: [true, "Please add the weight"]
    },
    height: {
       type: Number, 
       required: [true, "Please add the height"]
    },
    age: {
       type: Number, 
       required: [true, "Please add the age"]
    },
});

module.exports=mongoose.model("Client", clientSchema);