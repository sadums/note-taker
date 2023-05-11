const express = require('express');
const app = express();
const fileFunctions = require('../helpers/fileFunctions');
const { readFromFile, writeToFile, readAndAppend } = fileFunctions
const uuid = require('../helpers/uuid');

app.get('/notes', (req, res) => {
    console.info(`${req.method} request received in /api/notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

app.post('/notes', (req, res) => {
    console.info(`${req.method} request received in /api/notes`);

    if(req.body.title, req.body.text){
        const newNote = {
            title: req.body.title,
            text: req.body.text,
            id: uuid()
        }
        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote
        };
        res.json(response);
    }else{
        const response = {
            status: 'fail',
            body: 'Error in saving note'
        };
        res.json(response);
    }
});

app.delete('/notes/:noteid', (req, res) => {
    console.info(`${req.method} request received in /api/notes`);

    const noteid = req.params.noteid;
    let noteDeleted = false;
    readFromFile('./db/db.json').then((data) => {
        const notes = JSON.parse(data);
        for(let i = 0; i < notes.length; i++){
            if(notes[i].id === noteid){
                noteDeleted = true;
                notes.splice(i, 1);
            }
        }
        writeToFile('./db/db.json', notes);
        res.send(noteDeleted ? `Note with ID of ${noteid} has been deleted.` : `No matching ID found for ${noteid}`);
    });
});

module.exports = app;