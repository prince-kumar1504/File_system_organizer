const fs = require('fs')
const path = require('path')


function treefn(dirpath) {

    if (dirpath == undefined) {
        console.log('please enter a valid path')
    }
    else {
        let doesexist = fs.existsSync(dirpath)
        if (doesexist) {
            treehelper(dirpath, " ")
        }
    }


}

function treehelper(targetpath, indent) {

    let isfile = fs.lstatSync(targetpath).isFile()

    if (isfile == true) {
        let fileName = path.basename(targetpath)
        console.log(indent + "├", fileName)
    }

    else {
        let dirName = path.basename(targetpath)
        console.log(indent + "└", dirName)

        let childName = fs.readdirSync(targetpath)

        for (let i = 0; i < childName.length; i++) {
            let childPath = path.join(targetpath, childName[i])
            treehelper(childPath, indent + "    ")
        }
    }
}


module.exports = {

      treeFnKey : treefn

}