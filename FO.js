//1. First Activity with Node.js

// We will be creating a File System Organizer//
//Features of the Project -
//If you have numerous Files in a folder and they are not Properly arranged
//So you can use this tool to arrange them in specific directory according to their extension
// like text files will go into text File Folder .exe files will go into application folder and so on
// so at the end you will have a arranged set of files in specific folders

// we will be using built in node modules like fs and path to  create this project

// node js treats command line inputs as array and that array is your process array



const fs = require('fs')
const path = require('path')
const helpObj = require('./commands/help')
const treeObj = require('./commands/tree')
const organizeObj = require('./commands/organize')

let inputArr = process.argv.slice(2)

let command = inputArr[0]


switch (command) {
    case 'tree':
        treeObj.treeFnKey(inputArr[1])
        break;
    case 'organize':
        organizeObj.organizeFnKey(inputArr[1])
        break;
    case 'help':
        helpObj.helpFnKey()
        break;

    default:
        console.log('PLEASE ENTER A VALID COMMAND')
        break;
}
