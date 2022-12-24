import * as fs from "fs";
import chalk from "chalk";

const getNotes = () => {
  return "Your Notes....";
};

const addNote = (title, body) => {
  const notes = loadNotes();
  // const duplicateNotes = notes.filter((note) => title === note.title);

  debugger; //you can put this at different places of the program to debug the application rather than puting a bunch of console.log output, this will help us see everything till that point of the program like variables, object etc. it is intergrated with chrome devtools and v8 engine
  //it uses the builtin V8 debugger tools
  //use node --inspect-brk app.js [options] to see the debugger working

  const duplicateNote = notes.find((note) => title === note.title);
  if (!duplicateNote) {
    notes.push({ title, body });
    saveNotes(notes);
    console.log(chalk.bgGreen("New note added!"));
  } else {
    console.log(chalk.bgRed("Note title take!"));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const duplicateNotes = notes.filter((note) => title !== note.title);
  if (notes.length !== duplicateNotes.length) {
    saveNotes(duplicateNotes);
    console.log(chalk.bgGreen("Note removed!"));
  } else {
    console.log(chalk.bgRed("Note not found!"));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  if (notes.length === 0) {
    console.log(chalk.inverse.yellow("No notes to show!"));
  } else {
    console.log(chalk.inverse("Your notes :"));
    notes.forEach(({ title }, ind) => {
      console.log(ind + 1 + "." + title);
    });
  }
};

const readNote = (title) => {
  const notes = loadNotes();
  const noteToBeRead = notes.find((note) => note.title === title);
  if (noteToBeRead) {
    console.log(chalk.inverse("Title : " + noteToBeRead.title));
    console.log(noteToBeRead.body);
  } else {
    console.log(chalk.inverse.yellow("Note not found!"));
  }
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    const data = JSON.parse(dataJSON);
    return data;
  } catch (e) {
    return [];
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

export { getNotes, addNote, removeNote, listNotes, readNote };
