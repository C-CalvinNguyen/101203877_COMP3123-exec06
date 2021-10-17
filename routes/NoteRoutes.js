const noteModel = require('../models/NotesModel.js');

// Require Express
const express = require('express')
let app = express()

/*
    Removed as it was causing unexpected outcomes / errors
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    } 
*/

//TODO - Create a new Note (DONE)
//http://mongoosejs.com/docs/api.html#document_Document-save
app.post('/notes', async (req, res) => {
    // Validate request
    const note = new noteModel(req.body);

    //TODO - Write your code here to save the note
    try {
        await note.save();
        res.send(note);
    } catch (err) {
        res.status.send(err);
    }
});

//TODO - Retrieve all Notes (DONE)
//http://mongoosejs.com/docs/api.html#find_find
app.get('/notes', async (req, res) => {
    // Validate request
    const note = await noteModel.find({});

    //TODO - Write your code here to returns all note
    try {
        res.send(note);
    } catch (err) {
        res.status.send(err);
    }
});

//TODO - Retrieve a single Note with noteId (DONE)
//http://mongoosejs.com/docs/api.html#findbyid_findById
app.get('/notes/:noteId', async (req, res) => {
    // Validate request
    const note = await noteModel.find({_id: {$eq:req.params.noteId}})
    
    //TODO - Write your code here to return onlt one note using noteid
    try {
        res.send(note);
    } catch (err) {
        res.status.send(err);
    }
});

//TODO - Update a Note with noteId (DONE)
//http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
app.put('/notes/:noteId', async (req, res) => {
    // Validate request
    //TODO - Write your code here to update the note using noteid
    try {
        await noteModel.findByIdAndUpdate(req.params.noteId, {
            "noteTitle": req.body.noteTitle,
            "noteDescription": req.body.noteDescription,
            "priority": req.body.priority,
            "dateUpdated": Date.now()
        })
        note = await noteModel.save()
        res.send(note)
    } catch (err) {
        res.status(500).send(err)
    }
});

//TODO - Delete a Note with noteId (DONE)
//http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
app.delete('/notes/:noteId', async (req, res) => {
    // Validate request
    const note = await noteModel.findByIdAndDelete(req.params.noteId)

    //TODO - Write your code here to delete the note using noteid
    try {
        if(!note) {
            return res.status(400).send({
                message: "No Note Found"
            });
        }
        res.status(200).send()
    } catch (err) {
        res.status(500).send(err)
    }
});

// Module Export
module.exports = app