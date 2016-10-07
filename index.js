const fs = require("fs");
const path = require("path");


var originalPath = (__dirname + "/files");

function read(currentPath) {
    fs.readdirSync(currentPath, function(err, files) {
        if (err){
            console.log(err);
            process.exit();
        }
        console.log(currentPath + " contains " + files);
        files.map(function(file){
            return path.join(currentPath, file);
        }).filter(function(file){
            return fs.statSync(file).isDirectory();
        }).forEach(function(file){
            currentPath = file;
            read(currentPath);
        });
    });
}

read(originalPath);
