const notes = require("./notes.js")
const chalk = require("chalk")
const yargs = require("yargs")

//create commands
//add note
yargs.command({
    command: 'add',
    describe: 'Add a new note | Use --title for note title & Use --body for note body',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

//remove note
yargs.command({
    command: 'remove',
    describe: 'Remove a note | Use --title to search the note to be deleted',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

//list note
yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler() {
        notes.listNotes()
    }
})

//read note
yargs.command({
    command: 'read',
    describe: 'Read a note | Use --title to search the note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.findNote(argv.title)
    }
})


//Required
//it parses all of the config commands and runs it when gets called
yargs.parse()