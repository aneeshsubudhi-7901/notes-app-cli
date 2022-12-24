// const fs = require("fs");

// // fs.writeFileSync("notes.txt", "My name is Aneesh!"); //to write to files sychronously
// fs.appendFileSync("notes.txt", "I am a student");

//const utils = require("./utils.js"); //this will run the utils.js file first
// const name = "Aneesh";
import validator from "validator";
// import chalk from "chalk";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import * as notes from "./notes.js";
// import { version } from "yargs";

//console.log(utils.name); //we see that inspite of importing the file tils.js we were not able to access name as each file has its own scope with its variables

//console.log(utils.add(4, 3));
// console.log(notes.x, notes.y);
// console.log(validator.isEmail("aneesh@example.com"));
// console.log(validator.isURL("https://mead.io"));
// getNotes();

const argv = yargs(process.argv.slice(2)); //supplying command line arguments to the imported yargs(which is actually a function)

//customize yargs version
argv.version("1.1.0");

//add add,remove,edit,read

//add command
argv.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  },
});

//remove command
argv.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    // console.log("Removing the note");
    notes.removeNote(argv.title);
  },
});

//list command
argv.command({
  command: "list",
  describe: "List notes",
  handler() {
    // console.log("List of notes :");
    notes.listNotes();
  },
});

//read command
argv.command({
  command: "read",
  describe: "Read the note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    // console.log("Reading a note");
    notes.readNote(argv.title);
  },
});

// console.log(chalk.green.bold.inverse("Success!"));
// console.log(process.argv);
// console.log(argv.argv);

argv.parse();
