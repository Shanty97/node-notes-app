const fs = require("fs")
const chalk = require("chalk")

const addNote = (title, body) => {
    const notes = loadNotes()

    //to prevent duplication of notes with samw title
    const duplicateNotes = notes.find((note) => note.title === title)

    if (!duplicateNotes) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse("Note Added."))
    } else {
        console.log(chalk.red("Note title already exist."))
    }
}

const loadNotes = () => {
    try {
        //read data from json file
        const noteBuffer = fs.readFileSync('notes.json')
        //convert data to readable format
        const dataJSON = noteBuffer.toString()
        //return parsed data
        return JSON.parse(dataJSON)
    } catch {
        //if json file does not exist
        return []
    }
}

const saveNotes = (notes) => {
    //convert data into json format
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const removeNote = (title) => {
    const notes = loadNotes()
    const isNote = notes.find((note) => note.title === title)
    if (isNote != undefined) {
        const newNotes = notes.filter((note) => note.title != title)
        saveNotes(newNotes)
        console.log(chalk.green.inverse("Note removed."))
    } else {
        console.log(chalk.red.inverse("Note does not exist."))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    notes.forEach((note) => console.log(note.title))
}

const findNote = (title) => {
    const notes = loadNotes()
    const foundNote = notes.find((note) => note.title === title)
    if (foundNote != undefined) {
        console.log(chalk.inverse(foundNote.title))
        console.log(foundNote.body)
    } else {
        console.log(chalk.red.inverse("Note not found"))
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    findNote: findNote
}