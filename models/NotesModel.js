const mongoose = require('mongoose');

//TODO - Create Note Schema here having fields
//      - noteTitle
//      - noteDescription
//      - priority (Value can be HIGH, LOW or MEDUIM)
//      - dateAdded
//      - dateUpdated

const NoteSchema = new mongoose.Schema({
    noteTitle: {
        type: String,
        required: true
    },
    noteDescription: {
        type: String
    },
    priority: {
        type: String,
        validate(value) {
           if (value != "HIGH" && value != "MEDIUM" && value != "LOW") {
               throw new Error("Required HIGH, MEDIUM or LOW")
           }
        } 
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    dateUpdated: {
        type: Date,
        default: Date.now
    }
})

const Note = mongoose.model("Note", NoteSchema)
module.exports = Note;