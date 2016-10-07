const fs = require("fs");
const path = require("path");

var originalPath = (__dirname + "/files");
var obj = {};
var files = fs.readdirSync(originalPath);

function readIt(files, currentPath, obj) {
    files.forEach(function(file){
        var element = path.join(currentPath, file);
        var stats = fs.statSync(element);
        if (stats.isFile()){
            obj[file] = stats.size;
        }
        else if (stats.isDirectory()){
            var files = fs.readdirSync(element);
            var innerObj = {};
            obj[file] = innerObj;
            readIt(files, element, innerObj);
        }
    });
}

readIt(files, originalPath, obj);
console.log(obj);
var json = JSON.stringify(obj, null, 4);
fs.writeFileSync('files.json', json, function(err){
    if (err) console.log(err);
    console.log("It's Saved!");
});
