const fs = require("fs");
const pathModule = require("path");
const chalk = require('chalk');
var error = chalk.bold.red;
var property = chalk.cyan;
var note = chalk.green;
var desired = chalk.magenta;

function readIt(directory){
    return new Promise(function(resolve, reject){
        fs.readdir(directory, function(err, items){
            if (err) {
                reject();
            } else {
                var promises = [];
                for (var i=0; i<items.length; i++){
                    var path = directory + "/" + items[i];
                    promises.push(stats(path));
                }
                Promise.all(promises).then(function(){
                    resolve();
                });
            }
        });
    });
}

function stats(path){
    return new Promise(function(resolveS, rejectS){
        fs.stat(path, function(err, stat){
            if (err) {
                rejectS();
            } else {
                if (stat.isDirectory()){
                    console.log(path+" is a directory");
                    readIt(path).then(function(){
                        resolveS();
                    });
                } else {
                    console.log(path+" is not a directory");
                    resolveS();
                }
            }
        });
    });
}

readIt("./files").then(function(){
    console.log(property("Done!"));
}).catch(function(err){
    throw err;
});
