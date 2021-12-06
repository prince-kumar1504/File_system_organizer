const fs = require('fs')
const path = require('path')



let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: [ "docx","doc","pdf","xlsx","xls","odt","ods","odp","odg","odf","txt","ps","tex",
                 "csv", ],
    app: ["exe", "dmg", "pkg", "deb"],
}

function organizefn(dirpath) {

    // 1. input of directory path

    let destpath;

    if (dirpath == undefined) {
        console.log('please enter a valid directory path')
        return;
    }
    else {
        let doesExist = fs.existsSync(dirpath)

        if (doesExist == true) {
            // create a organised file driectory

            destpath = path.join(dirpath, 'organised files')

            if (fs.existsSync(destpath) == false) {
                fs.mkdirSync(destpath)
            }
            else {
                console.log('the file already exists')
            }

        }
        else {
            console.log('please enter a valid path')
        }
    }

    organizeHelper(dirpath, destpath)
}

function organizeHelper(src, dest) {

    let childNames = fs.readdirSync(src)
    //  console.log(childNames)

    for (let i = 0; i < childNames.length; i++) {

        let childAddress = path.join(src, childNames[i])

        let isfile = fs.lstatSync(childAddress).isFile()

        if (isfile == true) {

            let fileCategory = getCategory(childNames[i])
            console.log(childNames[i] + ' belongs to ' + fileCategory)

            sendFiles(childAddress, dest, fileCategory)

        }
    }


}

function getCategory(name) {

    let ext = path.extname(name)

    ext = ext.slice(1)
    // console.log(ext)

    for (let type in types) {

        let cTypeArr = types[type];

        for (i = 0; i < cTypeArr.length; i++) {
            if (ext == cTypeArr[i]) {
                return type;

            }
        }

    }
}

function sendFiles(srcFilePath, dest, fileCategory) {
    let catpath = path.join(dest, fileCategory)

    if (fs.existsSync(catpath) == false) {
        fs.mkdirSync(catpath)
    }
    let fileName = path.basename(srcFilePath)
    let destFilePath = path.join(catpath, fileName)

    fs.copyFileSync(srcFilePath, destFilePath)

    fs.unlinkSync(srcFilePath)

    console.log(fileName + " copied to " + fileCategory)


}


module.exports ={
    organizeFnKey : organizefn
}