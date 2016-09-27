const fs = require("fs");
const path = require("path");


var originalPath = (__dirname + "/files");

function read(currentPath) {
    fs.readdir(currentPath, function(err, files) {
        if (err){
            console.log(err);
            process.exit();
            return;
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
